import { CourseReviewsComponent } from './course-reviews.component';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from '../../shared-libs.module';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [CourseReviewsComponent],
  imports: [
    SharedLibsModule,
    PaginatorModule
  ],
  exports: [CourseReviewsComponent]
})
export class CourseReviewsModule { }
