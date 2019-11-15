import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionManagementComponent } from './permission-management.component';
import { PermissionMgmtUpdateComponent } from './permission-management-update.component';

@NgModule({
  declarations: [PermissionManagementComponent, PermissionMgmtUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  entryComponents: [],
  exports: [PermissionManagementComponent]
})
export class PermissionManagementModule { }
