import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'our-course',
  templateUrl: './our-course.component.html',
  styles: []
})
export class OurCourseComponent implements OnInit {

  images?: any[] = [
    {
      id: 1, // id of slide
      src: '../../../../assets/images/main/ourcourse1.png',
      srcT: '../../../../assets/images/main/ourcourse1Image.png',
      title: 'title 1',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/ourcourse2.png',
      srcT: '../../../../assets/images/main/ourcourse2Image.png',
      title: 'title 2',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/ourcourse3.png',
      srcT: '../../../../assets/images/main/ourcourse3Image.png',
      title: 'title 3',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'content 3'
    },
    {
      id: 4, // id of slide
      src: '../../../../assets/images/main/Our_Courses_page_04.png',
      srcT: '../../../../assets/images/main/ourcourse4Image.png',
      title: 'title 3',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'content 3'
    },
    {
      id: 5, // id of slide
      src: '../../../../assets/images/main/Ethical%20Hacking.jpg',
      srcT: '../../../../assets/images/main/Conductor%2002.png',
      title: 'title 3',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'content 3'
    },
    {
      id: 6, // id of slide
      src: '../../../../assets/images/main/3D%20Animation.jpg',
      srcT: '../../../../assets/images/main/Conductor%2001.png',
      title: 'title 3',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: 'content 3'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
