import { CourseListComponent } from './course-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
