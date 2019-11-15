import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';

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
  isSaving = false;
  constructor(
    private router: Router,
    private page: PageReloadService,
    private courseRegistrationService: CourseRegistrationService) { }

  ngOnInit() {
    this.totalTimeEstimateVideo = Math.floor(this.totalTimeEstimateVideo);
  }
  openVideoModal(content) {
   // this.bsModalRef = this.modalService.show(content, {class: 'modal-lg', ignoreBackdropClick: true});
  }
  registrationCourse(courseCode) {
    this.isSaving = true;
    this.courseRegistrationService.registrationCourse(courseCode).subscribe(res => {
      if (res) {
       // this.toastr.success('Thành công!', 'Đăng ký thành công!');
        setTimeout(() => {
          this.page.reload(this.router);
        }, 1500);
      } else {
        this.isSaving = false;
       // this.toastr.error('Xảy ra lỗi!!', 'Lỗi');
      }
    });
  }
}
