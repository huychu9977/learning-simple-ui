import { ReviewService } from './../../services/review.service';
import { LectureBO } from './../../models/lectureBO.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { Title } from '@angular/platform-browser';
import { LectureService } from 'src/app/services/lecture.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'page-lecture',
  templateUrl: './page-lecture.component.html',
  styleUrls: ['./page-lecture.component.scss']
})
export class PageLectureComponent implements OnInit {
  @ViewChild('more', {static: true}) elementView: ElementRef;
  descriptionMore = false;

  course?: CourseBO;
  chapters: any[];
  code: string;
  courseCode: string;
  lectureSelected: any;
  lecture?: LectureBO;
  page?: any = 0;
  answerChecked?: any = [];
  currentReview: any;
  selectedValue = 1;
  reviewContent = '';
  titleRates = ['Bad', 'Not Bad', 'OK', 'Good', 'Excellent'];
  reviewContentError = false;
  constructor(
    private modalRef: BsModalRef,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private titleService: Title,
    private lectureService: LectureService,
    private modalService: BsModalService,
    private courseService?: CourseService,
    private toastr?: ToastrService
    ) {
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseCode = params['course-code'];
      this.code = params.code;
      this.loadLecture(params['course-code'], params.code);
    });
    this.loadCourse(this.courseCode);
    this.loadReviewByCourse();
  }
  canTest() {
    this.answerChecked.forEach(a => {
      if (a.answer === 0) { return true; }
    });
    return false;
  }
  loadReviewByCourse() {
    this.reviewService.findOneByCourseAndCreatedBy(this.courseCode).subscribe(
      (res) => {
        this.currentReview = res;
      },
      (err) => console.log(err)
    );
  }
  loadLecture(courseCode?: string, code?: string) {
    this.lectureService.find(courseCode, code).subscribe(
      (res: HttpResponse<LectureBO>) => {
        this.lecture = res.body;
        this.titleService.setTitle(this.lecture.name);
        for (let i = 1; i <= this.lecture.questions.length; i++) {
          this.answerChecked.push({
            id : i,
            answer : 0
          });
        }
      },
      (res: HttpResponse<any>) => console.log(res)
    );
  }
  loadCourse(code?: string) {
    this.courseService.findForEmpoyer(code).subscribe(
      (res: HttpResponse<CourseBO>) => this.onSuccess(res.body),
      (res: HttpResponse<any>) => console.log(res)
    );
  }
  private onSuccess(data) {
    this.course = data;
    data.lectures.sort((t1, t2) => {
      if (t1.sortOrder > t2.sortOrder) { return 1; }
      if (t1.sortOrder < t2.sortOrder) { return -1; }
      return 0;
    });
    this.chapters = data.lectures.filter(l => {
      if (l.code === this.code) {
        this.lectureSelected = l;
        l.isCurrent = true;
      }
      return !l.parentCode;
    });
    this.chapters.forEach(c => {
      if (c.code === this.lectureSelected.parentCode) { c.isActive = true; }
    });
  }
  getLectures(code?: string) {
    return this.course.lectures.filter(l => {
      return (l.parentCode && l.parentCode === code);
    });
  }
  openReviewModal(content) {
    this.selectedValue = this.currentReview ? this.currentReview.rate : 1;
    this.reviewContent = this.currentReview ? this.currentReview.content : '';
    this.modalRef = this.modalService.show(content, {class: 'modal-md'});
  }
  update(reviewBO?: any) {
    if (this.reviewContent === '') {
      this.reviewContentError = true;
      return;
    } else {
      this.reviewContentError = false;
      const review = {
        courseCode : this.courseCode,
        content : this.reviewContent,
        rate : +this.selectedValue
      };
      if (this.currentReview) {
        this.reviewService.update(review).subscribe(
          (res) => {
            if (res) {
              this.loadReviewByCourse();
              this.modalRef.hide();
            }
          },
          (err) => {
            this.toastr.error(err.error.message, 'Thất bại!');
          }
        );
      } else {
        this.reviewService.create(review).subscribe(
          (res) => {
            if (res) {
              this.loadReviewByCourse();
              this.modalRef.hide();
            }
          },
          (err) => {
            this.toastr.error(err.error.message, 'Thất bại!');
          }
        );
      }
    }
  }
  close() {
    this.modalRef.hide();
  }
}
