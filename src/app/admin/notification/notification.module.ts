import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationUpdateComponent } from './notification-update.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';

@NgModule({
  declarations: [NotificationComponent, NotificationUpdateComponent],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ]
})
export class NotificationModule { }
