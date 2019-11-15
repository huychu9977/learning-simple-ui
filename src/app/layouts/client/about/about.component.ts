import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

  images?: any[] = [
    {
      id: 1, // id of slide
      src: '../../../../assets/images/main/aboutSlider1.png',
      title: 'title 1',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/aboutSlider2.png',
      title: 'title 2',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/aboutSlider3.png',
      title: 'title 3',
      content: 'content 3'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
