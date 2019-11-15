import { HasAnyAuthorityDirective } from '../../shared/util/has-any-authority.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleMgmtDetailComponent } from './role-management-detail.component';
import { RoleMgmtUpdateComponent } from './role-management-update.component';
import { RoleManagementComponent } from './role-management.component';

@NgModule({
  declarations: [RoleManagementComponent, RoleMgmtDetailComponent, RoleMgmtUpdateComponent, HasAnyAuthorityDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule
  ],
  entryComponents: [RoleMgmtDetailComponent],
  exports: [RoleManagementComponent]
})
export class RoleManagementModule { }
