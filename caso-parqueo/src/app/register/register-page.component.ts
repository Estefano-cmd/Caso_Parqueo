import { SubscriberType } from './../shared/emuns/subscriberType.enum';
import { Place } from './../shared/types/Place';
import { SessionService } from 'src/app/shared/services/session.service';
import { RegisterService } from './../shared/services/register.service';
import { SubscriberService } from './../shared/services/subscriber.service';
import { SubscriptionService } from './../shared/services/subscription.service';
import { PriceService } from './../shared/services/price.service';
import { SubscriptionType } from './../shared/types/SubscriptionType';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../shared/services/vehicle.service';
import { PlaceService } from '../shared/services/place.service.ts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../shared/types/Vehicle';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/types/Client';
import { SubscriptionTypeService } from '../shared/services/subscription-type.service';
import { Price } from '../shared/types/Price';
import { Subscriber } from '../shared/types/Subscriber';
import { Session } from '../shared/types/Session';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Register } from '../shared/types/Register';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  searchInput = new FormControl();
  searchStarted = false;
  form: FormGroup = this.prepareForm();
  susbscriptionTypes$ = new BehaviorSubject<Array<SubscriptionType>>([]);
  prices$ = new BehaviorSubject<Array<Price>>([]);
  session: Session;
  places: Place[] | any ;
  categorie$ =  new BehaviorSubject<string>('');
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private registerService: RegisterService,
    private priceService: PriceService,
    private subscriberService: SubscriberService,
    private subscriptionService: SubscriptionService,
    private subscriptionTypeService: SubscriptionTypeService,
    private placeService: PlaceService
  ) { }

  data$ = new BehaviorSubject<any>(null);
  ngOnInit(): void {
    this.session = this.sessionService.getSession();
    this.subscriptionTypeService.getAll().subscribe(res => this.susbscriptionTypes$.next(res));
    this.priceService.getAll().subscribe(res => this.prices$.next(res));
  }

  onDashboard(place: string): void {
    this.router.navigate(['dashboard'], { queryParams: { place }});
  }

  toAssign(): void {
    const client = this.data$.getValue()?.client;
    this.createRegister(client).subscribe((place: Place) => {
      this.router.navigate(['dashboard'], { queryParams: { place: place.name }});
    });
  }

  onSave(): void {
    if (!this.form.valid) {
      return;
    }
    const { client, vehicle, subscriber } = this.form.value;

    this.clientService.create({ name: client.name, surnames: client.surnames }).pipe(
      switchMap((clientCreated: Client) => this.createVehicle(vehicle, clientCreated).pipe(
        map(() => ({ subscriber, client: clientCreated }))
      )),
      switchMap((data: any) => this.createSubscriber(data.subscriber, data.client))
    ).subscribe((place: Place) => {
      this.router.navigate(['dashboard'], { queryParams: { place: place.name }});
    });
  }

  createVehicle(vehicle: Vehicle, client: Client): Observable<null> {
    return this.vehicleService.create({
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      model: vehicle.model,
      marca: vehicle.marca,
      clientId: client.id
    });
  }

  createSubscriber(subscriber: any, client: Client): Observable<Place> {
    if (this.isSubscriber) {
      return this.subscriberService.create({
        email: subscriber.email,
        direction: subscriber.direction,
        phone: subscriber.phone,
        enabled: true,
        clientId: client.id
      }).pipe(
        switchMap((resSubscriber: Subscriber) => {
          return this.subscriptionService.create({
            subscriberId: resSubscriber.id,
            subscriptionTypeId: subscriber.subscriptionTypeId,
            dateBegin: subscriber.dateBegin,
            dateFinish: subscriber.dateFinish
          });
        }),
        switchMap(() => this.createRegister(client))
      );
    } else {
      return this.createRegister(client);
    }
  }

  setAvailablePlace(subscriberType: string, avaliablePlaces: Array<Place>): Place {
    const aPlaces = avaliablePlaces.filter((place: Place) => place.name.includes('A'));
    const bPlaces = avaliablePlaces.filter((place: Place) => !place.name.includes('A'));

    if (subscriberType === SubscriberType.ABONADO_VIP) {
      if (aPlaces.length === 0) {
        return bPlaces[0];
      }
      return aPlaces[0];
    }
    else {
      // VISITANTE o ABONADO VIP
      return bPlaces[0];
    }
  }

  createRegister(client: Client): Observable<Place> {
    return this.placeService.getAvailablePlaces(false).pipe(
      switchMap((avaliablePlaces) => {
        if (avaliablePlaces.length === 0) {
          this.snackBar.open('NO HAY ESPACIOS DISPONIBLES EN EL PARQUEO!', 'OK');
          return;
        }

        const category = this.categorie$.getValue();
        const place = this.setAvailablePlace(category, avaliablePlaces);

        return this.registerService.create({
          dateEntry: new Date(),
          dateExit: null,
          placeId: place.id,
          total: null,
          enabled: true,
          priceId: this.getPrice(),
          clientId: client.id,
          employeId: this.session?.id || 1,
        }).pipe(
          switchMap(() => this.placeService.update({state: true}, place?.id).pipe(
            map(() => place)
          ))
        );
      })
    );
  }

  searchLicensePlate(): void {
    // @ts-ignore
    this.form.patchValue({
      vehicle: {
        licensePlate: this.searchInput.value,
      },
    });

    this.vehicleService.getOneByLicensePlate(this.searchInput.value).pipe(
      tap(() => this.searchStarted = true),
      switchMap((vehicle: Vehicle) => {
        if (!vehicle) {
          return of(null);
        }
        return this.clientService.getOne(vehicle.clientId).pipe(
          map((client: Client) => {
            return {
              vehicle,
              client
            };
          })
        );
      }),
      switchMap((data: any) => {
        return this.registerService.getOneByClientId(data?.client?.id).pipe(
          map((register: Register) => {
            return {
              ...data,
              register
            };
          })
        );
      })
    ).subscribe((data: any) => {
      console.log(data);
      this.data$.next(data);
      this.subscriberService.getOne(data?.client?.id).pipe(
        switchMap(s => this.subscriptionService.getOne(s?.id)),
        switchMap(d => this.subscriptionTypeService.getOne(d?.subscriptionTypeId))
      ).subscribe(r => {
        const categorie = r ? r.name : 'Visitante';
        this.categorie$.next(categorie);
      });
    });
  }

  prepareForm(): FormGroup {
    return this.fb.group({
      client: this.fb.group({
        name: ['', Validators.required],
        surnames: ['', Validators.required],
        isSubscriber: false
      }),
      vehicle: this.fb.group({
        licensePlate: ['', Validators.required],
        color: ['', Validators.required],
        model: ['', Validators.required],
        marca: ['', Validators.required],
      }),
      subscriber: this.fb.group({
        subscriptionTypeId: [1],
        email: [''],
        direction: [''],
        phone: [''],
        dateBegin: [],
        dateFinish: []
      })
    });
  }

  getPrice(): number|null {
    const subscriberType = this.categorie$.getValue();

    if (!this.isSubscriber && subscriberType === SubscriberType.VISITANTE) {
      const prices =  this.prices$.getValue() as Array<Price>;
      return prices[0]?.id || 5;
    } else {
      return null;
    }
  }

  get isAsigned(): boolean {
    const data = this.data$.getValue();
    // console.log("asigned", data)
    if (data === null || data.register === null) {
      return false;
    }
    if (data?.register?.dateExit === null) {
      return true;
    } else {
      return false;
    }

  }

  get isSubscriber(): boolean {
    // @ts-ignore
    return this.form.get('client').controls.isSubscriber.value as boolean;
  }
}
