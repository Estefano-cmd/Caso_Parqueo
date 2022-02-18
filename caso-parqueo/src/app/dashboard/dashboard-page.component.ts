import { Component, OnInit } from '@angular/core';
import { SubscriptionTypeService } from './../shared/services/subscription-type.service';
import { SubscriptionService } from './../shared/services/subscription.service';
import { SubscriberService } from './../shared/services/subscriber.service';
import { PriceService } from '../shared/services/price.service';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    private priceService: PriceService,
    private subscriberService: SubscriberService,
    private subscriptionService: SubscriptionService,
    private registerService: RegisterService,
    private subscriptionTypeService: SubscriptionTypeService
  ) { }

  ngOnInit(): void {
    this.subscriptionTypeService.getAll().subscribe((d) => console.log(d));
  }

}
