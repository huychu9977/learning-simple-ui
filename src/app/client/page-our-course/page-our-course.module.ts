import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOurCourseComponent } from './page-our-course.component';
import { LoadingScreenComponent } from 'src/app/layouts/loading-screen/loading-screen.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseGirdModule } from 'src/app/shared/modules/course-gird/course-gird.module';
import { BannerImageModule } from 'src/app/layouts/client/banner-image/banner-image.module';
import { CourseCardModule } from 'src/app/shared/modules/course-card/course-card.module';
import { CourseListModule } from 'src/app/shared/modules/course-list/course-list.module';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [PageOurCourseComponent, LoadingScreenComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CarouselModule,
    CourseGirdModule,
    BannerImageModule,
    CourseCardModule,
    CourseListModule,
    PaginationModule.forRoot()
  ],
  exports: [PageOurCourseComponent]
})
export class PageOurCourseModule { }
