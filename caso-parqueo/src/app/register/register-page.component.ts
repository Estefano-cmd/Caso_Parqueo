import { BehaviorSubject, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../shared/services/vehicle.service';
import { FormControl } from '@angular/forms';
import { Vehicle } from '../shared/types/Vehicle';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/types/Client';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  searchInput = new FormControl();
  searchStarted = false;
  constructor(
    private vehicleService: VehicleService,
    private clientService: ClientService
  ) { }
  data$ = new BehaviorSubject<any>(null);
  ngOnInit(): void {
  }

  toAssign(): void {

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
}
