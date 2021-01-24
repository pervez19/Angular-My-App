import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from '../admin-routing/admin-routing.module';
import { LayoutComponent } from '../../layout/layout.component';
import { OverviewComponent } from '../../overview/overview.component';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      AdminRoutingModule
  ],
  declarations: [
      LayoutComponent,
      OverviewComponent
  ]
})
export class AdminModule { }
