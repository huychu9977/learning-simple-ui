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
    CarouselModule
  ],
  exports: [PageHomeComponent]
})
export class PageHomeModule { }
