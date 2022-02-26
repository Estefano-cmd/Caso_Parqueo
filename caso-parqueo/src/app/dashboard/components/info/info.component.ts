import { SubscriberType } from './../../../shared/emuns/subscriberType.enum';
import { PriceService } from './../../../shared/services/price.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { SubscriberService } from '../../../shared/services/subscriber.service';
import { SubscriptionTypeService } from '../../../shared/services/subscription-type.service';
import { RegisterService } from '../../../shared/services/register.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { Price } from '../../../shared/types/Price';
import { PlaceService } from '../../../shared/services/place.service.ts.service';
import { Place } from '../../../shared/types/Place';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private registerService: RegisterService,
    private placeService: PlaceService,
    private priceService: PriceService,
    private subscriberService: SubscriberService,
    private subscriptionService: SubscriptionService,
    private subscriptionTypeService: SubscriptionTypeService
     ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onCheckOut(): void {
    this.subscriberService.getOne(this.data?.client?.id).pipe(
      switchMap(s => this.subscriptionService.getOne(s?.id)),
      switchMap(d => this.subscriptionTypeService.getOne(d?.subscriptionTypeId))
    ).subscribe(r => {
      const subscriberType = r ? r.name : SubscriberType.VISITANTE as SubscriberType;

      const dateEntry = new Date(this.data.dateEntry) as any;
      const dateExit = new Date() as any;
      const difference = Math.abs(dateExit - dateEntry);
      const hours = Math.ceil(difference / (1000 * 3600));

      this.priceService.getOne(this.data.priceId).pipe(
        switchMap((price: Price) => {
          return this.registerService.update(this.data?.id, {
            dateExit: new Date(),
            total: this.calculateTotalByClient(subscriberType, hours, +price?.amount)
          });
        }),
        switchMap(() => this.placeService.update({ state: false}, this.data.placeId))
      ).subscribe(() => {
        this.dialogRef.close(true);
      });
    });
  }

  calculateTotalByClient(subscriberType: any, hours: number, price: number): number {
    if (subscriberType === SubscriberType.VISITANTE) {
      return hours * price;
    }

    return null;
  }
}
