import { NgModule } from '@angular/core';
import { EventManagementComponent } from './event-management.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { EventManagementUpdateComponent } from './event-management-update.component';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';
import {CalendarModule} from 'primeng/calendar';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';
@NgModule({
  declarations: [EventManagementComponent, EventManagementUpdateComponent],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule,
    CalendarModule
  ],
  providers: [SlugifyPipe]
})
export class EventManagementModule { }
