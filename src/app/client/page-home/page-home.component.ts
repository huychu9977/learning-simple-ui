import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { EventBO } from 'src/app/models/eventBO.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  slides?: any[] = [
    {
      id: 1, // id of slide
      src: '../../../../assets/images/main/Banner-02.jpg',
      title: 'Khóa học chất lượng',
      content: 'Chất lượng là uy tín hàng đầu được S-Learning đề ra.'
    },
    {
      id: 2, // id of slide
      src: '../../../../assets/images/main/banner1.png',
      title: 'Giảng viên',
      content: 'Đội ngũ giảng viên đầy kinh nghiệm đến từ nhiều trường đại học cũng như nhiều công ty lớn.'
    },
    {
      id: 3, // id of slide
      src: '../../../../assets/images/main/banner_03.jpg',
      title: 'Học viên',
      content: 'Số lượng học viên đăng ký lớn và liên tục tăng tạo nên sự uy tín của chương trình.'
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
  listCoursePopular?: any[] = [];
  listCourseNewest?: any[] = [];
  events: any[] = [];
  constructor(private eventService: EventService, private courseService: CourseService) { }

  ngOnInit() {
    this.loadCoursePopular();
    this.loadCourseNewest();
    this.loadEvents();
  }

  loadCoursePopular() {
    this.courseService.getListCoursePopularForEmployer({
      page: 0,
      size: 10
    }).subscribe(res => {
      this.listCoursePopular = res.content;
    }, err => { console.log(err.error.message); });
  }

  loadCourseNewest() {
    this.courseService.getListCourseNewestForEmployer({
      page: 0,
      size: 10
    }).subscribe(res => {
      this.listCourseNewest = res.content;
    }, err => { console.log(err.error.message); });
  }

  loadEvents() {
    this.eventService.queryForEmployer({
      page: 0,
      size: 4,
    }).subscribe(res => {
      const data: any = res.body;
      this.events = data.content.map(event => {
        if (new Date(event.startDate).toLocaleString().split(', ')[0] === new Date(event.endDate).toLocaleString().split(', ')[0]) {
          const date = new Date(event.startDate).toLocaleString('default', { month: 'long' });
          event.date = {
            month : date.length > 3 ? date.substring(0, 3) : date,
            day: new Date(event.startDate).getDate()
          };
          event.startDate = new Date(event.startDate).toLocaleTimeString().replace(/:\d+ /, ' ');
          event.endDate = new Date(event.endDate).toLocaleTimeString().replace(/:\d+ /, ' ');
          event.sameDay = true;
        } else {
          event.startDate = new Date(event.startDate).toLocaleDateString('en-GB');
          event.endDate = new Date(event.endDate).toLocaleDateString('en-GB');
          event.sameDay = false;
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
