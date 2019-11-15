import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.scss']
})
export class FooterComponent {

  images?: any[] = [
    {
      id: 1, // id of slide
      src: 'assets/images/main/blogsmall4.png',
      title: 'title 1',
      content: 'content 1'
    },
    {
      id: 2, // id of slide
      src: 'assets/images/main/blogsmall1.png',
      title: 'title 2',
      content: 'content 2'
    },
    {
      id: 3, // id of slide
      src: 'assets/images/main/blogsmall3.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 4, // id of slide
      src: 'assets/images/main/blogsmall1.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 5, // id of slide
      src: 'assets/images/main/blogsmall4.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 6, // id of slide
      src: 'assets/images/main/blogsmall2.png',
      title: 'title 3',
      content: 'content 3'
    },
    {
      id: 7, // id of slide
      src: 'assets/images/main/blogsmall3.png',
      title: 'title 3',
      content: 'content 3'
    }
  ];
}
