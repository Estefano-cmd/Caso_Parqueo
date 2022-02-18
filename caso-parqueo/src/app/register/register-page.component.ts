import { SessionService } from 'src/app/shared/services/session.service';
import { RegisterService } from './../shared/services/register.service';
import { SubscriberService } from './../shared/services/subscriber.service';
import { SubscriptionService } from './../shared/services/subscription.service';
import { PriceService } from './../shared/services/price.service';
import { SubscriptionType } from './../shared/types/SubscriptionType';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../shared/services/vehicle.service';
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

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  searchInput = new FormControl();
  searchStarted = false;
  form: FormGroup = this.prepareForm();
  susbscriptionTypes$ = new BehaviorSubject<Array<SubscriptionType>>([])
  prices$ = new BehaviorSubject<Array<Price>>([])
  session: Session;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private registerService: RegisterService,
    private priceService: PriceService,
    private subscriberService: SubscriberService,
    private subscriptionService: SubscriptionService,
    private subscriptionTypeService: SubscriptionTypeService
  ) { }
  data$ = new BehaviorSubject<any>(null);
  ngOnInit(): void {
    this.session = this.sessionService.getSession()
    this.subscriptionTypeService.getAll().subscribe(res => this.susbscriptionTypes$.next(res));
    this.priceService.getAll().subscribe(res => this.prices$.next(res));
  }

  toAssign(): void {
    console.log(this.form.value)
  }

  onSave() {
    console.log(this.form.value)
    const { client, vehicle, subscriber } = this.form.value;

    this.clientService.create({ name: client.name, surnames: client.surnames }).pipe(
      switchMap((clientCreated: Client) => this.createVehicle(vehicle, clientCreated).pipe(
        map(() => ({ subscriber, client: clientCreated }))
      )),
      switchMap(({subscriber, client}: any) => this.createSubscriber(subscriber, client))
    ).subscribe(() => {
      this.router.navigate(['dashboard'])
    })
  }

  createVehicle(vehicle: Vehicle, client: Client): Observable<null> {
    console.log("Guardando vehiculo....", client)
    return this.vehicleService.create({
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      model: vehicle.model,
      marca: vehicle.marca,
      clientId: client.id
    })
  }

  createSubscriber(subscriber: any, client: Client): Observable<null> {

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
          })
        }),
        switchMap(() => this.createRegister(client))
      )
    } else {
      return this.createRegister(client)
    }
  }

  createRegister(client: Client): Observable<null> {
    console.log("Guardando registro2....", client)
    return this.registerService.create({
      dateEntry: new Date(),
      dateExit: null,
      place: this.getPlace(),
      total: null,
      enabled: true,
      priceId: this.getPrice(),
      clientId: client.id,
      employeId: this.session?.id || 1,
    })
  }

  getPlace() {
    return "A1"
  }

  searchLicensePlate(): void {
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
      })
    ).subscribe((data: any) => {
      this.data$.next(data);
    });
  }

  prepareForm(): FormGroup {
    return this.fb.group({
      client: this.fb.group({
        name: ["", Validators.required],
        surnames: ["", Validators.required],
        isSubscriber: false
      }),
      vehicle: this.fb.group({
        licensePlate:["", Validators.required],
        color: ["", Validators.required],
        model: ["", Validators.required],
        marca: ["", Validators.required],
      }),
      subscriber: this.fb.group({
        subscriptionTypeId: [1],
        email: [""],
        direction: [""],
        phone: [""],
        dateBegin: [],
        dateFinish: []
      })
    })
  }

  getPrice() {
    const prices =  this.prices$.getValue() as Array<Price>;
    return prices[0].id
  }

  get isSubscriber(): boolean {
    return this.form.get('client')['controls'].isSubscriber.value as boolean;
  }
}
