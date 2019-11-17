import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOurTeacherComponent } from './page-our-teacher.component';
import { FormsModule } from '@angular/forms';
import { BannerImageModule } from 'src/app/shared/modules/banner-image/banner-image.module';

@NgModule({
  declarations: [PageOurTeacherComponent],
  imports: [
    CommonModule,
    BannerImageModule,
    FormsModule
  ],
  exports: [PageOurTeacherComponent]
})
export class PageOurTeacherModule { }
