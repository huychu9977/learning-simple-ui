import { HasAnyAuthorityDirective } from './../../shared/auth/has-any-authority.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleMgmtDetailComponent } from './role-management-detail.component';
import { RoleMgmtUpdateComponent } from './role-management-update.component';
import { RoleManagementComponent } from './role-management.component';
import { PaginationModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [RoleManagementComponent, RoleMgmtDetailComponent, RoleMgmtUpdateComponent, HasAnyAuthorityDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    NgSelectModule,
    PaginationModule.forRoot()
  ],
  entryComponents: [RoleMgmtDetailComponent],
  exports: [RoleManagementComponent]
})
export class RoleManagementModule { }
