import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-our-teacher',
  templateUrl: './page-our-teacher.component.html',
  styles: []
})
export class PageOurTeacherComponent implements OnInit {
  images?: any[] = [
    {
      id: 1, // id of slide
      src: '../../../../assets/images/main/teacher2.png',
      srcT: '/our-teacher/teacher/kkk',
      title: 'title 1',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/teacher3.png',
      srcT: '/our-teacher/teacher/kkk',
      title: 'title 2',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/teacher4.png',
      srcT: '/our-teacher/teacher/kkk',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 4, // id of slide
      src: '../../../../assets/images/main/teacher1.png',
      srcT: '/our-teacher/teacher/kkk',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 5, // id of slide
      src: '../../../../assets/images/main/Teacher%2005.jpg',
      srcT: '/our-teacher/teacher/kkk',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 6, // id of slide
      src: '../../../../assets/images/main/Teacher%2008.jpg',
      srcT: '/our-teacher/teacher/kkk',
      title: 'title 3',
      content: 'content 3'
    }
  ];
  page = 0;
  itemsPerPage = 20;
  totalItems: any = 100;
  constructor() { }

  ngOnInit() {
  }
  loadPage(page: number) {
  }
}
