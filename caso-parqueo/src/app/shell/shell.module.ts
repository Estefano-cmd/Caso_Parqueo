import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellPageComponent } from './shell-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShellPageComponent
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ShellModule { }
