import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-faq',
  templateUrl: './test-faq.component.html',
  styles: []
})
export class TestFaqComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left test-left_arrow slick-arrow"></i>',
    '<i class="fa fa-angle-right test-right_arrow slick-arrow"></i>'],
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
      src: '../../../../assets/images/main/eventSlider1.png',
      srcT: '../../../../assets/images/main/ourcourse1Image.png',
      title: 'title 1',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/Testimonial%2002.jpg',
      srcT: '../../../../assets/images/main/ourcourse2Image.png',
      title: 'title 2',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/Testimonial%2003.jpg',
      srcT: '../../../../assets/images/main/ourcourse3Image.png',
      title: 'title 3',
      content: 'content 3'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
