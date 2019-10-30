import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CourseCardComponent]
})
export class CourseCardModule { }
