import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellPageComponent } from './shell-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShellPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
        pathMatch: 'full'
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then((m) => m.RegisterModule),
        pathMatch: 'full'
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats.module').then((m) => m.StatsModule),
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
