import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.scss']
})
export class FooterComponent {
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        responsive: {
          0: {
            items: 2
          },
          400: {
            items: 3
          },
          740: {
            items: 5
          },
          940: {
            items: 6
          }
        },
        nav: false
      };
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
