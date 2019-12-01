import { HasAnyAuthorityDirective } from '../../shared/util/has-any-authority.directive';
import { NgModule } from '@angular/core';
import { RoleMgmtUpdateComponent } from './role-management-update.component';
import { RoleManagementComponent } from './role-management.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';

@NgModule({
  declarations: [RoleManagementComponent, RoleMgmtUpdateComponent, HasAnyAuthorityDirective],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ],
  exports: [RoleManagementComponent]
})
export class RoleManagementModule { }
