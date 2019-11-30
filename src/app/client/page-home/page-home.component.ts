import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventBO } from 'src/app/models/eventBO.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
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
  images1?: any[] = [
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
  images2?: any[] = [
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
  images3?: any[] = [
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
  events: any[] = [];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.queryForEmployer({
      page: 0,
      size: 4,
    }).subscribe(res => {
      const data: any = res.body;
      this.events = data.results.map(event => {
        if (new Date(event.startDate).toLocaleString().split(', ')[0] === new Date(event.endDate).toLocaleString().split(', ')[0]) {
          const date = new Date(event.startDate).toLocaleString('default', { month: 'long' });
          event.date = {
            month : date.length > 3 ? date.substring(0, 3) : date,
            day: new Date(event.startDate).getDate()
          };
          event.startDate = new Date(event.startDate).toLocaleTimeString().replace(/:\d+ /, ' ');
          event.endDate = new Date(event.endDate).toLocaleTimeString().replace(/:\d+ /, ' ');
        } else {
          event.startDate = new Date(event.startDate).toLocaleDateString('en-GB');
          event.endDate = new Date(event.endDate).toLocaleDateString('en-GB');
        }
        return event;
      });
    }, err => {
      console.log(err.error.message);
    });
  }

  formatEventDate(startDate, endDate) {
    console.log(startDate);
    return;
  }
}
