import { CarouselModule } from 'ngx-owl-carousel-o';
import { OurCourseComponent } from './our-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseGirdModule } from 'src/app/shared/modules/course-gird/course-gird.module';

@NgModule({
  declarations: [OurCourseComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CourseGirdModule
  ],
  exports: [OurCourseComponent]
})
export class OurCourseModule { }
