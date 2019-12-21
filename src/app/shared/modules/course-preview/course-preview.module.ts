import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursePreviewComponent } from './course-preview.component';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SharedLibsModule } from '../../shared-libs.module';
@NgModule({
  declarations: [CoursePreviewComponent],
  imports: [
    RouterModule,
    DialogModule,
    ToastModule,
    SharedLibsModule
  ],
  exports: [CoursePreviewComponent]
})
export class CoursePreviewModule { }
