import { ReviewService } from './../../services/review.service';
import { LectureBO } from './../../models/lectureBO.model';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { Title } from '@angular/platform-browser';
import { LectureService } from 'src/app/services/lecture.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpResponse } from '@angular/common/http';
import { CommentService } from 'src/app/services/comment.service';
import { CommentBO } from 'src/app/models/CommentBO.model';
import { AccountService } from 'src/app/core/auth/account.service';
import { QuestionService } from 'src/app/services/question.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'page-lecture',
  templateUrl: './page-lecture.component.html',
  styleUrls: ['./page-lecture.component.scss']
})
export class PageLectureComponent implements OnInit, AfterContentChecked {

  @ViewChild('more', {static: true}) elementView: ElementRef;
  indexTab = 0;
  descriptionMore = false;
  expand = false;
  course?: any;
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
  lectureCompleted: any[] = [];
  totalLecture = 0;
  keyword = '';
  currentAccount;
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
  colors = ['#f4c150', '#76c5d6', '#686f7a', '#00576b'];
  errorAnswer = false;
  correctAnswer = false;
  listQuestionIncorrect: any[] = [];
  display = false;
  fileAttachments: any = [];
  constructor(
    private changeDetector: ChangeDetectorRef,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private titleService: Title,
    private lectureService: LectureService,
    private commentService: CommentService,
    private accountService: AccountService,
    private questionService: QuestionService,
    private courseService: CourseService,
    private confirmationService: ConfirmationService
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
    this.loadLectureCompleted();
    this.loadAllComment();
    this.accountService.identity().then(account => {
        this.currentAccount = account;
    });
    this.route.queryParams.subscribe(data => {
      if (data.commentId) {
        this.indexTab = 1;
        this.openDetailComment(data.commentId);
        this.commentService.setIsSeenComment(data.commentId).subscribe(res => {});
      }
    });
  }
  totalTimeEstimate() {
    let time = 0;
    this.course.lectures.forEach(l => {
      if (l.parentCode && l.type.code === 'lecture') {
        time += l.videoTimeEstimation === null ? 0 : l.videoTimeEstimation;
      }
    });
    return Math.floor(time / 60);
  }
  // attachment
  openDialogAttachment(event, op, fileAttachments) {
    this.fileAttachments = fileAttachments;
    op.toggle(event);
  }
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
      lectureId : this.lecture.id
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
        lectureId : this.lecture.id
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
          this.totalItems = res.body.totalResult;
          this.comments = res.body.results;
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
    this.courseService.queryLectureCompleted(this.courseCode).subscribe(res => {
      this.lectureCompleted = res;
    });
  }
  getPercentCompleted() {
    return Math.floor(this.lectureCompleted.length * 100 / this.totalLecture);
  }
  toggleCompletedLecture(id?: any) {
    this.courseService.toggleCompletedLecture(id).subscribe(res => {
      if (res) {
        // this.loadLectureCompleted();
        if (this.lectureCompleted.indexOf(id) > -1) {
          this.lectureCompleted.splice(this.lectureCompleted.indexOf(id), 1);
        } else {
          this.lectureCompleted.push(id);
        }
      } else {
        console.log('error');
      }
    });
  }
  loadReviewByCourse() {
    this.reviewService.findOneByCourseAndCreatedBy(this.courseCode).subscribe(
      (res) => {
        this.currentReview = res;
      },
      (err) => console.log(err)
    );
  }
  timeEstimate(time) {
    return Math.floor(time / 60);
  }
  checkAnswer() {
    let check = 0;
    this.answerChecked.forEach(ans => {
      if (ans.id === 0) {
        this.errorAnswer = true;
        check = 1;
      }
    });
    if (check === 0) {
      this.errorAnswer = false;
      this.listQuestionIncorrect = [];
      this.questionService.checkAnswer(this.answerChecked).subscribe(res => {
        this.listQuestionIncorrect = res.body;
        if (this.listQuestionIncorrect.length === 0) {
          this.toggleCompletedLecture(this.lecture.id);
        }
        this.correctAnswer = true;
        setTimeout(() => {
          this.correctAnswer = false;
        }, 2500);
      });
    }
  }
  loadLecture(courseCode?: string, code?: string) {
    this.isLoadLecture = true;
    this.lectureService.find(courseCode, code).subscribe(
      (res: HttpResponse<LectureBO>) => {
        this.lecture = res.body;
        this.titleService.setTitle(this.lecture.name);
        for (let i = 1; i <= this.lecture.questions.length; i++) {
          this.answerChecked.push({
            id: 0,
            questionId: this.lecture.questions[i - 1].id
          });
        }
        this.isLoadLecture = false;
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
    this.totalLecture = data.lectures.length - this.chapters.length;
  }
  getLectures(code?: string) {
    return this.course.lectures.filter(l => {
      return (l.parentCode && l.parentCode === code);
    });
  }
  openReviewModal() {
    this.selectedValue = this.currentReview ? this.currentReview.rate : 1;
    this.reviewContent = this.currentReview ? this.currentReview.content : '';
    this.display = true;
  }
  update() {
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
              this.display = false;
            }
          },
          (err) => {
            console.log('error update rating');
          }
        );
      } else {
        this.reviewService.create(review).subscribe(
          (res) => {
            if (res) {
              this.loadReviewByCourse();
              this.display = false;
            }
          },
          (err) => {
            console.log('error create rating');
          }
        );
      }
    }
  }
  close() {
    this.display = false;
  }
}
