import { NgSelectModule } from '@ng-select/ng-select';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { PaginationModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [UserManagementComponent, UserMgmtDetailComponent, UserMgmtUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    NgSelectModule,
    PaginationModule.forRoot()
  ],
  entryComponents: [UserMgmtDetailComponent],
  exports: [UserManagementComponent]
})
export class UserManagementModule { }
