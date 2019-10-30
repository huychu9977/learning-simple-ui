import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCourseComponent } from './page-course.component';
import { CourseBannerTextComponent } from 'src/app/shared/modules/course-banner-text/course-banner-text.component';
import { CourseWillLearnComponent } from 'src/app/shared/modules/course-will-learn/course-will-learn.component';
import { CourseReviewsModule } from 'src/app/shared/modules/course-reviews/course-reviews.module';
import { CourseListModule } from 'src/app/shared/modules/course-list/course-list.module';
import { CoursePreviewModule } from 'src/app/shared/modules/course-preview/course-preview.module';

@NgModule({
  declarations: [PageCourseComponent,
      CourseBannerTextComponent
    , CourseWillLearnComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CourseReviewsModule,
    CourseListModule,
    CoursePreviewModule
  ],
  exports: [PageCourseComponent]
})
export class PageCourseModule { }
