import { NgModule } from '@angular/core';
import { PermissionManagementComponent } from './permission-management.component';
import { PermissionMgmtUpdateComponent } from './permission-management-update.component';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [PermissionManagementComponent, PermissionMgmtUpdateComponent],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ],
  entryComponents: [],
  exports: [PermissionManagementComponent]
})
export class PermissionManagementModule { }
