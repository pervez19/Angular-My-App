import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from '../../details/details.component';
import { LayoutComponent } from '../../layout/layout.component';
import { UpdateComponent } from '../../update/update.component';
import { ProfileRoutingModule } from '../profile-routing/profile-routing.module';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      ProfileRoutingModule
  ],
  declarations: [
      LayoutComponent,
      DetailsComponent,
      UpdateComponent
  ]
})
export class ProfileModule { }
