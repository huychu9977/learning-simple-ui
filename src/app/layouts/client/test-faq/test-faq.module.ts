import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestFaqComponent } from './test-faq.component';

@NgModule({
  declarations: [TestFaqComponent],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class TestFaqModule { }
