import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';
import { AccountService } from 'src/app/core/auth/account.service';
import { LoginModalService } from 'src/app/core/auth/login-modal.service';
import { MessageService } from 'primeng/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.scss']
})
export class CoursePreviewComponent implements OnInit {
  @Input() course?: any;
  @Input() userRegistration?: any;
  @Input() totalLectureQuiz?: any;
  @Input() totalLectureExercise?: any;
  @Input() totalLectureVideo?: any;
  @Input() totalTimeEstimateVideo?: any;
  @Input() lectureCode?: string;
  // tslint:disable-next-line:no-output-rename
  @Output('registerSuccess') change = new EventEmitter<boolean>();
  isSaving = false;
  display = false;
  currentAccount = null;
  constructor(
    private messageService: MessageService,
    private loginModalService: LoginModalService,
    private accountService: AccountService,
    private courseRegistrationService: CourseRegistrationService) { }

  ngOnInit() {
    this.totalTimeEstimateVideo = Math.floor(this.totalTimeEstimateVideo);
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    }).catch(() => {
      this.loginModalService.open();
    });
  }

  registrationCourse(courseCode) {
    if (this.currentAccount) {
      this.isSaving = true;
      this.courseRegistrationService.registrationCourse(courseCode).subscribe(res => {
        if (res) {
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Đăng ký thành công!'});
          this.change.emit(true);
          this.isSaving = false;
        } else {
          this.isSaving = false;
          this.messageService.add({severity: 'error', detail: 'Có lỗi xảy ra!'});
        }
      });
    } else {
      this.loginModalService.open();
    }
  }
}
