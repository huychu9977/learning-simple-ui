import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserHeaderComponent } from './user-header.component';
import { PopoverModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports: [UserHeaderComponent]
})
export class UserHeaderModule { }
