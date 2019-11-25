import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursePreviewComponent } from './course-preview.component';
import {DialogModule} from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [CoursePreviewComponent],
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    ToastModule
  ],
  exports: [CoursePreviewComponent]
})
export class CoursePreviewModule { }
