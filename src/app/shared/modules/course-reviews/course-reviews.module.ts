import { HighlightSearch } from './../../util/highlight-text.pipe';
import { CourseReviewsComponent } from './course-reviews.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [CourseReviewsComponent, HighlightSearch],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports: [CourseReviewsComponent]
})
export class CourseReviewsModule { }
