import { UserMgmtUpdateComponent } from './user-management-update.component';
import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';

@NgModule({
  declarations: [UserManagementComponent, UserMgmtDetailComponent, UserMgmtUpdateComponent],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ],
  entryComponents: [UserMgmtDetailComponent],
  exports: [UserManagementComponent]
})
export class UserManagementModule { }
