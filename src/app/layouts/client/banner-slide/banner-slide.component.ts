import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'banner-slide',
  templateUrl: './banner-slide.component.html',
  styles: [
    '.img-div {margin-left:0; margin-right:0;}'
  ]
})
export class BannerSlideComponent implements OnInit {

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
