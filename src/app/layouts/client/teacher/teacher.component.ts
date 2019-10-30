import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'teacher',
  templateUrl: './teacher.component.html',
  styles: []
})
export class TeacherComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };
  images?: any[] = [
    {
      id: 1, // id of slide
      src: '../../../../assets/images/main/teacher2.png',
      srcT: '../../../../assets/images/main/counterPartBorderBottom.png',
      title: 'title 1',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/teacher3.png',
      srcT: '../../../../assets/images/main/counterPartBorderBottom.png',
      title: 'title 2',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/teacher4.png',
      srcT: '../../../../assets/images/main/counterPartBorderBottom.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 4, // id of slide
      src: '../../../../assets/images/main/teacher1.png',
      srcT: '../../../../assets/images/main/counterPartBorderBottom.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 5, // id of slide
      src: '../../../../assets/images/main/Teacher%2005.jpg',
      srcT: '../../../../assets/images/main/counterPartBorderBottom.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 6, // id of slide
      src: '../../../../assets/images/main/Teacher%2008.jpg',
      srcT: '../../../../assets/images/main/counterPartBorderBottom.png',
      title: 'title 3',
      content: 'content 3'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
