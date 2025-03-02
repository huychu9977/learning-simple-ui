import { ReviewService } from './../../services/review.service';
import { LectureBO } from './../../models/lectureBO.model';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterContentChecked, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LectureService } from 'src/app/services/lecture.service';
import { HttpResponse } from '@angular/common/http';
import { CommentService } from 'src/app/services/comment.service';
import { CommentBO } from 'src/app/models/CommentBO.model';
import { AccountService } from 'src/app/core/auth/account.service';
import { QuestionService } from 'src/app/services/question.service';
import { ConfirmationService } from 'primeng/api';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';

@Component({
  selector: 'page-lecture',
  templateUrl: './page-lecture.component.html',
  styleUrls: ['./page-lecture.component.scss']
})
export class PageLectureComponent implements OnInit, AfterContentChecked {

  @ViewChild('more', {static: true}) elementView: ElementRef;
  verticalOffset = 115;
  descriptionMore = false;
  expand = false;
  code: string;
  courseCode: string;
  lectures?: any[] = [];
  lectureSelected?: any;
  page?: any = 0;
  answerChecked?: any = [];
  currentReview: any;
  selectedValue = 1;
  reviewContent = '';
  titleRates = ['Bad', 'Not Bad', 'OK', 'Good', 'Excellent'];
  reviewContentError = false;
  lectureCompleted: any = null;
  totalLecture = 0;
  totalLectureCompleted = 0;
  keyword = '';
  currentAccount;
  exerciseFiles?: any[] = [];
  //
  currentPage = 1;
  previousPage = 1;
  itemsPerPage = 5;
  totalItems;
  comments: CommentBO[] = [];
  currentType = null;
  isAddComment = false;
  isEditComment = false;
  isDetailComment = false;
  comment: any = {
    title: '',
    content: ''
  };
  reply;
  currentComment: any;
  isAlert = false;
  load = false;
  isLoadLecture = false;
  isLoadReview = false;
  colors = ['#f4c150', '#76c5d6', '#686f7a', '#00576b'];
  errorAnswer = false;
  correctAnswer = false;
  listQuestionIncorrect: any[] = [];
  display = false;
  isOpenQuiz = false;
  isChecking = false;
  isLoadingLecture = false;
  constructor(
    private courseRegistrationService: CourseRegistrationService,
    private changeDetector: ChangeDetectorRef,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private titleService: Title,
    private lectureService: LectureService,
    private commentService: CommentService,
    private accountService: AccountService,
    private questionService: QuestionService,
    private router: Router,
    private confirmationService: ConfirmationService
    ) {
    }

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (!account) {
        this.router.navigate(['/not-found']);
        return;
      }
      this.currentAccount = account;
    });
    this.route.params.subscribe(params => {
      this.courseCode = params['course-code'];
      this.code = params.code;
      this.loadLecture();
    });
    this.courseRegistrationService.findOne(this.courseCode).subscribe(res => {
      if (!res) {
        this.router.navigate(['/course', this.courseCode]);
        return;
      }
    });
    this.loadAllLecture(this.courseCode);
  }
  openListLecture(c?: any) {
    if (c.isOpen) {
      c.isActive = !c.isActive;
    }
  }
  // attachment
  downloadAttachment(file) {
    const link = document.createElement('a');
    link.href = file.fileUrl;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  // comment start
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  onTabChange(event) {
    if (event.index === 1) {
      this.loadAllComment();
      this.isAddComment = false;
    }
  }

  openTabAddComment() {
    this.isAddComment = true;
    this.comment = {};
    this.comment.title = '';
    this.comment.content = '';
  }
  createdComment() {
    this.load = true;
    const commetDTO = {
      ...this.comment,
      lectureId : this.lectureSelected.id
    };
    this.commentService.create(commetDTO).subscribe(res => {
      if (res) {
        this.isAddComment = false;
        this.isAlert = true;
        this.load = false;
        this.loadAllComment();
        setTimeout(() => {
          this.isAlert = false;
        }, 2000);
      }
    });
  }
  openEditComment(comment?: any) {
    this.currentComment.replies.forEach(repCmt => {
      repCmt.isEdit = false;
    });
    this.isEditComment = false;
    this.comment = {};
    if (comment) {
      this.comment.id = comment.id;
      this.comment.parentId = comment.parentId;
      this.comment.content = comment.content;
      comment.isEdit = true;
    } else {
      this.isEditComment = true;
      this.comment.id = this.currentComment.id,
      this.comment.title = this.currentComment.title;
      this.comment.content = this.currentComment.content;
    }
  }
  createReplies() {
    if (this.reply !== '') {
      delete this.comment.id;
      delete this.comment.title;
      this.comment.parentId = this.currentComment.id;
      this.comment.content = this.reply;
      this.updateComment();
      this.reply = '';
    }
  }
  updateComment() {
    if (this.comment.content !== '') {
      this.load = true;
      const commetDTO = {
        ...this.comment,
        lectureId : this.lectureSelected.id
      };
      this.commentService.update(commetDTO).subscribe(res => {
        if (res) {
          this.load = false;
          this.isEditComment = false;
          this.comment = {};
          this.openDetailComment(this.currentComment.id);
          this.loadAllComment();
        }
      });
    }
  }
  openDetailComment(commentId) {
    this.load = true;
    this.isDetailComment = true;
    this.currentComment = {};
    this.commentService.find(commentId).subscribe(res => {
      this.currentComment = res.body;
      if (this.currentComment.replies.length > 0) {
        this.currentComment.replies.forEach(repCmt => {
          repCmt.isEdit = false;
        });
      }
      this.load = false;
    });
  }
  // confirm delete comment
  // end
  openDeleteComment(id?: any) {
    this.confirmationService.confirm({
      message: 'Xóa bình luận?',
      accept: () => {
        this.load = true;
        if (id) {
          this.commentService.delete(id).subscribe(res => {
            this.openDetailComment(this.currentComment.id);
          });
        } else {
          this.commentService.delete(this.currentComment.id).subscribe(res => {
            this.loadAllComment();
            this.isDetailComment = false;
          });
        }
        this.load = false;
      }
    });
  }
  search() {
    this.currentPage = 1;
    this.loadAllComment();
  }
  loadAllComment() {
    this.comments = [];
    this.load = true;
    // tslint:disable-next-line:prefer-const
    let param = {
      page: this.currentPage - 1,
      size: this.itemsPerPage,
      keyword: this.keyword,
      lectureCode: this.code
    };
    if (!this.currentType) {
      delete param.lectureCode;
    }
    this.commentService
    .query(param, this.courseCode)
    .subscribe(
        (res: HttpResponse<any>) => {
          this.totalItems = res.body.totalElements;
          this.comments = res.body.content;
          this.load = false;
        },
        (res: HttpResponse<any>) => console.log(res.body)
    );
  }
  loadPage(event: any) {
    this.currentPage = event.page + 1;
    if (this.currentPage !== this.previousPage) {
        this.loadAllComment();
        this.previousPage = this.currentPage;
    }
  }
  changeSelect(event) {
    if (event === 'all') {
      this.currentType = null;
    } else {
      this.currentType = true;
    }
    this.loadAllComment();
  }
  // comment end
  loadLectureCompleted() {
    this.lectureService.getLectureCompletedByLectureCode(this.lectureSelected.code).subscribe(res => {
      this.lectureCompleted = res;
    });
  }
  getPercentCompleted() {
    return Math.floor((this.totalLectureCompleted - 1) * 100 / this.totalLecture);
  }

  loadReviewByCourse() {
    return this.reviewService.findOneByCourseAndCreatedBy(this.courseCode).toPromise().then(res => {
      return res;
    }).catch(err => {
      console.log(err);
    });
  }
  timeEstimate(time) {
    return Math.floor(time / 60);
  }
  checkAnswer() {
    let check = 0;
    console.log(this.answerChecked);
    this.answerChecked.forEach(ans => {
      if (ans.id === 0) {
        this.errorAnswer = true;
        check = 1;
      }
    });
    if (check === 0) {
      this.isChecking = true;
      this.errorAnswer = false;
      this.listQuestionIncorrect = [];
      this.questionService.checkAnswer(this.answerChecked).subscribe(res => {
        this.listQuestionIncorrect = res.body;
        if (this.listQuestionIncorrect.length === 0) {
          this.loadLectureCompleted();
          this.loadAllLecture(this.courseCode);
          this.isOpenQuiz = false;
        }
        this.correctAnswer = true;
        this.isChecking = false;
      }, err => {this.isChecking = false; });
    }
  }
  loadLecture() {
    this.isLoadingLecture = true;
    return this.lectureService.find(this.courseCode, this.code).toPromise()
    .then(res => {
      this.lectureSelected = res.body;
      this.exerciseFiles = this.lectureSelected.fileAttachments.filter(e => {
        return e.type === 'EXERCISE';
      });
      this.titleService.setTitle(this.lectureSelected.name);
      if (this.lectureSelected.type === 'LECTURE_QUIZ') {
        this.isOpenQuiz = false;
        this.page = 0;
        this.loadLectureCompleted();
        this.answerChecked = [];
        for (let i = 1; i <= this.lectureSelected.questions.length; i++) {
          this.answerChecked.push({
            id: 0,
            questionId: this.lectureSelected.questions[i - 1].id
          });
        }
      }
      this.isLoadingLecture = false;
      return this.lectureCompleted;
    }).catch(res => this.router.navigate(['/not-found']));
  }
  loadAllLecture(code?: string) {
    this.isLoadLecture = true;
    this.lectureService.getAllLectureByCourseCodeForEmployer(code).subscribe(
      res => this.onSuccess(res),
      err => this.router.navigate(['/not-found'])
    );
  }
  private onSuccess(data) {
    this.lectures = data;
    this.loadLecture().then(res => {
      this.lectures.forEach(c => {
        this.totalLecture ++;
        if (c.isOpen) {
          this.totalLectureCompleted++;
        }
        c.lectures.forEach(l => {
          if (l.code === this.lectureSelected.code) { c.isActive = true; }
        });
      });
    });
    this.isLoadLecture = false;
  }

  openReviewModal() {
    this.loadReviewByCourse().then(res => {
      this.currentReview = res;
      this.selectedValue = this.currentReview ? this.currentReview.rate : 1;
      this.reviewContent = this.currentReview ? this.currentReview.content : '';
      this.display = true;
    });
  }
  update() {
    if (this.reviewContent === '') {
      this.reviewContentError = true;
      return;
    } else {
      this.isLoadReview = true;
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
              this.isLoadReview = false;
              this.display = false;
            }
          },
          (err) => {
            console.log('error update rating');
            this.isLoadReview = false;
          }
        );
      } else {
        this.reviewService.create(review).subscribe(
          (res) => {
            if (res) {
              this.isLoadReview = false;
              this.display = false;
            }
          },
          (err) => {
            console.log('error create rating');
            this.isLoadReview = false;
          }
        );
      }
    }
  }
  close() {
    this.display = false;
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.verticalOffset = 115 - this.verticalOffset < 0 ? 0 : 115 - this.verticalOffset;
  }
}
