import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMyCourseComponent } from './page-my-course.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [PageMyCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginatorModule
  ]
})
export class PageMyCourseModule { }
