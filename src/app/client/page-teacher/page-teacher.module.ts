import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTeacherComponent } from './page-teacher.component';
import { CourseListModule } from 'src/app/shared/modules/course-list/course-list.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageTeacherComponent],
  imports: [
    CommonModule,
    FormsModule,
    CourseListModule
  ],
  exports: [PageTeacherComponent]
})
export class PageTeacherModule { }
