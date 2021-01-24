import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from '../accounts-routing/accounts-routing.module';
import { ListComponent } from '../list/list.component';
import { EditComponent } from '../edit/edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortByPipe } from '@app/_shared/sort-by.pipe';
@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      NgbModule,
      AccountsRoutingModule
    
  ],
  declarations: [
      ListComponent,
      EditComponent,
      SortByPipe
  ]
})
export class AccountsModule { }
