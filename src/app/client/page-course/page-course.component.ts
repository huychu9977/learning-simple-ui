
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CourseBO } from './../../models/courseBO.model';
import { Title } from '@angular/platform-browser';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';
import { ReviewService } from 'src/app/services/review.service';
import { CourseService } from 'src/app/services/course.service';
import { SUCCESS } from 'src/app/shared/constants/status.constants';

@Component({
  selector: 'page-course',
  templateUrl: './page-course.component.html',
  styleUrls: ['./page-course.component.scss']
})
export class PageCourseComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {
  @ViewChild('hh', {static: true}) elementView: ElementRef;
  @ViewChild('script', {static: false}) script: ElementRef;
  @ViewChild('courseWillLearnE', {static: false}) courseWillLearnElement?: ElementRef;
  courseWillLearnMore = false;
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
  totalLectureVideo: any = 0;
  totalLectureQuiz: any = 0;
  totalLectureExercise: any = 0;
  userRegistration?: any;
  rates: any[] = [];
  rateAvg: any;
  private sub: any;
  loading = false;

  constructor(
    private courseRegistrationService: CourseRegistrationService,
    private route: ActivatedRoute,
    private router: Router,
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
  }

  checkIsRegistration() {
    this.courseRegistrationService.findOne(this.courseCode).subscribe(res => {
      this.userRegistration = res;
      this.loading = false;
    }, err => {this.loading = false; });
  }

  registerSuccess(data) {
    if (data === true) {
      this.checkIsRegistration();
    }
  }

  loadRating() {
    this.reviewService.getRating({
      courseCode: this.courseCode
      }).subscribe(
        res => {
          this.rates = res;
          if (this.rates.length > 0) {
            this.rates[0].rateAvg = this.rates[0] ? Math.round(this.rates[0].rateAvg * 10) / 10 : 1;
            this.rateAvg = Math.floor(this.rates[0].rateAvg);
          }
          this.loading = false;
        },
        (res: HttpResponse<any>) => {this.loading = false; }
    );
  }
  loadOne(code?: string) {
    this.loading = true;
    this.courseService.findForEmpoyer(code).subscribe(
      (res: HttpResponse<CourseBO>) => this.onSuccess(res.body),
      (res: HttpResponse<any>) => this.router.navigate(['/not-found'])
    );
  }
  private onSuccess(data) {
    this.course = data;
    this.course.lectures.forEach(c => {
      c.lectures.forEach(l => {
        if (l.type === 'LECTURE_QUIZ') { this.totalLectureQuiz++; }
        if (l.type === 'LECTURE_CODE') { this.totalLectureExercise++; }
        if (l.type === 'LECTURE_VIDEO') { this.totalLectureVideo++; }
      });
    });
    this.titleService.setTitle(this.course.name);
    this.checkIsRegistration();
    this.loadRating();
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
  totalTimeEstimate() {
    let time = 0;
    this.course.lectures.forEach(chapter => {
      chapter.lectures.forEach(lecture => {
        time += lecture.videoTimeEstimation;
      });
    });
    return time;
  }
  totalChapterTimeEstimate(code?: string) {
    let time = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.course.lectures.length; i++) {
      if (this.course.lectures[i].code === code) {
        for (const l of this.course.lectures[i].lectures) {
          time += l.videoTimeEstimation;
        }
        break;
      }
    }
    return time;
  }
  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.course.lectures[index].isActive) {
      this.course.lectures[index].isActive = false;
    } else {
      this.course.lectures[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 1 + 'px';
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
