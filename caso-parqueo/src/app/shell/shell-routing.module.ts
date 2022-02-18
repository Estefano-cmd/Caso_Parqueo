import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '../guards/session.guard';
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
        canActivate : [SessionGuard],
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then((m) => m.RegisterModule),
        canActivate : [SessionGuard],
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats.module').then((m) => m.StatsModule),
        canActivate : [SessionGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
