
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpResponse } from '@angular/common/http';
import { CourseBO } from './../../models/courseBO.model';
import { Title } from '@angular/platform-browser';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';
import { ReviewService } from 'src/app/services/review.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'page-course',
  templateUrl: './page-course.component.html',
  styleUrls: ['./page-course.component.scss']
})
export class PageCourseComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {
  @ViewChild('hh', {static: true}) elementView: ElementRef;
  @ViewChild('script', {static: false}) script: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left course-left_arrow slick-arrow"></i>',
    '<i class="fa fa-angle-right course-right_arrow slick-arrow"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  };
  images1?: any[] = [
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
      src: '../../../../assets/images/main/Our_CourseBOs_page_04.png',
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

  courseCode: string;
  course?: CourseBO = {lectures: []};
  descriptionMore = false;
  chapters: any[] = [];
  totalLectureVideo: any = 0;
  totalLectureQuiz: any = 0;
  totalLectureExercise: any = 0;
  userRegistration?: any;
  rates: any[] = [];
  rateAvg: any;
  private sub: any;

  constructor(
    private courseRegistrationService: CourseRegistrationService,
    private route: ActivatedRoute,
    private titleService: Title,
    private changeDetector: ChangeDetectorRef,
    private reviewService: ReviewService,
    private courseService?: CourseService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.courseCode = params['course-code'];
      this.loadOne(this.courseCode);
    });
    this.courseRegistrationService.findOne(this.courseCode).subscribe(res => {
      this.userRegistration = res;
    });
    this.loadRating();
  }
  loadRating() {
    this.reviewService.getRating({
      courseCode: this.courseCode
      }).subscribe(
        (res: HttpResponse<any[]>) => {
          this.rates = res.body;
          this.rates[0].rateAvg = Math.round(this.rates[0].rateAvg * 10) / 10;
          this.rateAvg = Math.floor(this.rates[0].rateAvg);
        },
        (res: HttpResponse<any>) => console.log(res)
    );
  }
  loadOne(code?: string) {
    this.courseService.findForEmpoyer(code).subscribe(
      (res: HttpResponse<CourseBO>) => this.onSuccess(res.body),
      (res: HttpResponse<any>) => console.log(res)
    );
  }
  private onSuccess(data) {
    this.course = data;
    this.course.lectures.sort((t1, t2) => {
      if (t1.sortOrder > t2.sortOrder) { return 1; }
      if (t1.sortOrder < t2.sortOrder) { return -1; }
      return 0;
    });
    this.chapters = this.course.lectures.filter(l => {
      return !l.parentCode;
    });
    this.course.lectures.forEach(l => {
      if (l.type.code === 'quiz') { this.totalLectureQuiz++; }
      if (l.type.code === 'coding_exercise') { this.totalLectureExercise++; }
      if (l.type.code === 'lecture') { this.totalLectureVideo++; }
    });
    this.titleService.setTitle(this.course.name);
  }
  convertToScript() {
    const element = this.script.nativeElement;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'assets/js/custom-page-course.js';
    const parent = element.parentElement;
    parent.replaceChild(script, element);
  }
// course-content
  getLectures(code?: string) {
    return this.course.lectures.filter(l => {
      return (l.parentCode && l.parentCode === code);
    });
  }
  totalTimeEstimate() {
    let time = 0;
    this.course.lectures.forEach(l => {
      if (l.parentCode && l.type.code === 'lecture') {
        time += l.videoTimeEstimation === null ? 0 : l.videoTimeEstimation;
      }
    });
    return time;
  }
  totalChapterTimeEstimate(code?: string) {
    let time = 0;
    this.course.lectures.forEach(l => {
      if (l.parentCode && l.parentCode === code && l.type.code === 'lecture') {
        time += l.videoTimeEstimation === null ? 0 : l.videoTimeEstimation;
      }
    });
    return time;
  }
  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.chapters[index].isActive) {
      this.chapters[index].isActive = false;
    } else {
      this.chapters[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }
// end-course-content

  ngAfterViewInit() {
    this.convertToScript();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
