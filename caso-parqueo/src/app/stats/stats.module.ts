import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsPageComponent } from './stats-page.component';


@NgModule({
  declarations: [
    StatsPageComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
