import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserHeaderComponent } from './user-header.component';

@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [UserHeaderComponent]
})
export class UserHeaderModule { }
