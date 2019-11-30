import { Component, HostListener, AfterContentInit, AfterContentChecked } from '@angular/core';


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

  constructor() { }

  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (window.pageYOffset < document.body.scrollHeight * 0.6) {
        document.getElementById('myBtn').style.visibility = 'hidden';
        document.getElementById('myBtn').style.opacity = '0';
    } else {
      document.getElementById('myBtn').style.visibility = 'visible';
      document.getElementById('myBtn').style.opacity = '1';
    }
  }

  goToTop() {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }
}
