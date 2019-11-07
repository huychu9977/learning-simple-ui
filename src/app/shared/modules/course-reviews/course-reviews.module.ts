import { CourseReviewsComponent } from './course-reviews.component';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap';
import { SharedLibsModule } from '../../shared-libs.module';

@NgModule({
  declarations: [CourseReviewsComponent],
  imports: [
    SharedLibsModule,
    PaginationModule.forRoot()
  ],
  exports: [CourseReviewsComponent]
})
export class CourseReviewsModule { }
