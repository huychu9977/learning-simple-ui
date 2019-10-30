import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerImageComponent } from './banner-image.component';

@NgModule({
  declarations: [BannerImageComponent],
  imports: [
    CommonModule
  ],
  exports: [BannerImageComponent]
})
export class BannerImageModule { }
