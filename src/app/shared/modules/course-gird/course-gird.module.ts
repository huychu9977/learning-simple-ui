import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseGirdComponent } from './course-gird.component';

@NgModule({
  declarations: [CourseGirdComponent],
  imports: [
    CommonModule
  ],
  exports: [CourseGirdComponent]
})
export class CourseGirdModule { }
