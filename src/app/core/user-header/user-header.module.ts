import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserHeaderComponent } from './user-header.component';

@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [UserHeaderComponent]
})
export class UserHeaderModule { }
