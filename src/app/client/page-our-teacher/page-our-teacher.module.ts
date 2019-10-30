import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOurTeacherComponent } from './page-our-teacher.component';
import { TeacherGirdModule } from 'src/app/shared/modules/teacher-gird/teacher-gird.module';
import { BannerImageModule } from 'src/app/layouts/client/banner-image/banner-image.module';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageOurTeacherComponent],
  imports: [
    CommonModule,
    TeacherGirdModule,
    BannerImageModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports: [PageOurTeacherComponent]
})
export class PageOurTeacherModule { }
