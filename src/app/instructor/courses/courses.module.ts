import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CourseManagementModule } from 'src/app/admin/course-management/course-management.module';
import { BannerImageModule } from 'src/app/shared/modules/banner-image/banner-image.module';
import { RouterModule } from '@angular/router';
import { LectureManagementModule } from 'src/app/admin/lecture-management/lecture-management.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    RouterModule,
    BannerImageModule,
    CourseManagementModule,
    LectureManagementModule
  ]
})
export class CoursesModule { }
