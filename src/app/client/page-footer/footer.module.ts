import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import { FooterComponent } from './footer.component';
@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
