import { NgModule } from '@angular/core';
import { EventManagementComponent } from './event-management.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { EventManagementUpdateComponent } from './event-management-update.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EventManagementComponent, EventManagementUpdateComponent],
  imports: [
    TranslateModule,
    SharedLibsModule,
    RouterModule
  ]
})
export class EventManagementModule { }
