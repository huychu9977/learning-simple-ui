import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SlideModel } from 'ngx-owl-carousel-o/lib/models/slide.model';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banner-slide',
  templateUrl: './banner-slide.component.html',
  styles: [
    '.img-div {margin-left:0; margin-right:0;}'
  ]
})
export class BannerSlideComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left left_arrow slick-arrow"></i>',
    '<i class="fa fa-angle-right  right_arrow slick-arrow"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };
  images?: any[] = [
    {
      id: 1, // id of slide
      src: '../../../../assets/images/main/Banner-02.jpg',
      title: 'title 1',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/banner1.png',
      title: 'title 2',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/banner_03.jpg',
      title: 'title 3',
      content: 'content 3'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
