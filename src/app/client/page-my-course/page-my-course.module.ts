import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMyCourseComponent } from './page-my-course.component';
import { PaginationModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [PageMyCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginationModule.forRoot()
  ]
})
export class PageMyCourseModule { }
