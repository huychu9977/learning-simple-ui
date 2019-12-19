import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCourseComponent } from './page-course.component';
import { CourseBannerTextComponent } from 'src/app/shared/modules/course-banner-text/course-banner-text.component';
import { CourseReviewsModule } from 'src/app/shared/modules/course-reviews/course-reviews.module';
import { CourseListModule } from 'src/app/shared/modules/course-list/course-list.module';
import { CoursePreviewModule } from 'src/app/shared/modules/course-preview/course-preview.module';
import { MinuteSecondsPipe } from 'src/app/shared/util/minute-second-pipe';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [PageCourseComponent,
      CourseBannerTextComponent, MinuteSecondsPipe],
  imports: [
    CommonModule,
    CourseReviewsModule,
    CourseListModule,
    CoursePreviewModule,
    SharedLibsModule
  ],
  exports: [PageCourseComponent]
})
export class PageCourseModule { }
