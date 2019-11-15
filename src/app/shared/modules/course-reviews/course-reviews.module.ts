import { CourseReviewsComponent } from './course-reviews.component';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from '../../shared-libs.module';

@NgModule({
  declarations: [CourseReviewsComponent],
  imports: [
    SharedLibsModule
  ],
  exports: [CourseReviewsComponent]
})
export class CourseReviewsModule { }
