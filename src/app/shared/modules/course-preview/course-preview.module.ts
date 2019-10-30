import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursePreviewComponent } from './course-preview.component';

@NgModule({
  declarations: [CoursePreviewComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CoursePreviewComponent]
})
export class CoursePreviewModule { }
