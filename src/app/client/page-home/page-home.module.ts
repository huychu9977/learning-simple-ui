import { BannerSlideComponent } from './../../layouts/client/banner-slide/banner-slide.component';
import { PageHomeComponent } from './page-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupportComponent } from 'src/app/layouts/client/support/support.component';
import { AboutComponent } from 'src/app/layouts/client/about/about.component';
import { CounterPartComponent } from 'src/app/layouts/client/counter-part/counter-part.component';
import { TestFaqComponent } from 'src/app/layouts/client/test-faq/test-faq.component';
import { OurCourseModule } from 'src/app/layouts/client/our-course/our-course.module';
import { TeacherModule } from 'src/app/layouts/client/teacher/teacher.module';
@NgModule({
  declarations: [PageHomeComponent, BannerSlideComponent,
    SupportComponent, AboutComponent, CounterPartComponent,
    TestFaqComponent],
  imports: [
    CommonModule,
    OurCourseModule,
    TeacherModule,
    RouterModule
  ],
  exports: [PageHomeComponent]
})
export class PageHomeModule { }
