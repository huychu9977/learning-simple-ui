import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerImageComponent } from './banner-image.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BannerImageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BannerImageComponent]
})
export class BannerImageModule { }
