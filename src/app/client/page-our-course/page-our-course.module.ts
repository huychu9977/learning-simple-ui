import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOurCourseComponent } from './page-our-course.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseCardModule } from 'src/app/shared/modules/course-card/course-card.module';
import { CourseListModule } from 'src/app/shared/modules/course-list/course-list.module';
import { BannerImageModule } from 'src/app/shared/modules/banner-image/banner-image.module';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [PageOurCourseComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BannerImageModule,
    CourseCardModule,
    CourseListModule,
    CarouselModule,
    PaginatorModule
  ],
  exports: [PageOurCourseComponent]
})
export class PageOurCourseModule { }
