import { CourseListComponent } from './course-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
