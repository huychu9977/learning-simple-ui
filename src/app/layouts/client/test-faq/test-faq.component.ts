import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-faq',
  templateUrl: './test-faq.component.html',
  styles: []
})
export class TestFaqComponent implements OnInit {

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
