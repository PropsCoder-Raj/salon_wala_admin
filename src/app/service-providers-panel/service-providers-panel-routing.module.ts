import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../__helper/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsDetailsComponent } from './bookings/bookings-details/bookings-details.component';
import { ServicesComponent } from './services/services.component';
import { BreadServicesComponent } from './services/bread-services/bread-services.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path : "", redirectTo: "dashboard", pathMatch: "full" },
  { path : "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  { path : "services", component: ServicesComponent, canActivate: [AuthGuard]},
  { path : "services/activity/:action", component: BreadServicesComponent, canActivate: [AuthGuard]},
  { path : "bookings", component: BookingsComponent, canActivate: [AuthGuard]},
  { path : "transaction", component: TransactionComponent, canActivate: [AuthGuard]},
  { path : "bookings-details/:id", component: BookingsDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProvidersPanelRoutingModule { }
