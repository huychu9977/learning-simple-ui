import { CourseListModule } from './../../shared/modules/course-list/course-list.module';
import { PageHomeComponent } from './page-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CarouselModule} from 'primeng/carousel';
@NgModule({
  declarations: [PageHomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    CourseListModule
  ],
  exports: [PageHomeComponent]
})
export class PageHomeModule { }
