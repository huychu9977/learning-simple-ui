import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagementComponent } from './event-management.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { EventManagementUpdateComponent } from './event-management-update.component';



@NgModule({
  declarations: [EventManagementComponent, EventManagementUpdateComponent],
  imports: [
    CommonModule,
    SharedLibsModule
  ]
})
export class EventManagementModule { }
