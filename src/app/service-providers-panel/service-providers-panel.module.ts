import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProvidersPanelRoutingModule } from './service-providers-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsDetailsComponent } from './bookings/bookings-details/bookings-details.component';
import { ServicesComponent } from './services/services.component';
import { BreadServicesComponent } from './services/bread-services/bread-services.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule } from '@angular/forms';



import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    DashboardComponent,
    BookingsComponent,
    BookingsDetailsComponent,
    ServicesComponent,
    BreadServicesComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    Ng2SearchPipeModule,
    ServiceProvidersPanelRoutingModule
  ]
})
export class ServiceProvidersPanelModule { }
