import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { MaterialModule } from '../material/material.module';
import { InfoComponent } from './components/info/info.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
