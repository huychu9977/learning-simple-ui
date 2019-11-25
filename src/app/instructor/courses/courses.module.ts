import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CourseManagementModule } from 'src/app/admin/course-management/course-management.module';
import { BannerImageModule } from 'src/app/shared/modules/banner-image/banner-image.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    RouterModule,
    BannerImageModule,
    CourseManagementModule
  ]
})
export class CoursesModule { }
