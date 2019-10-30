import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSlideComponent } from './banner-slide.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [BannerSlideComponent],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class BannerSlideModule { }
