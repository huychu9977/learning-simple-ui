import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CourseBO } from 'src/app/models/courseBO.model';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.scss']
})
export class CoursePreviewComponent implements OnInit {
  @Input() course?: CourseBO;
  @Input() userRegistration?: any;
  @Input() totalLectureQuiz?: any;
  @Input() totalLectureExercise?: any;
  @Input() totalLectureVideo?: any;
  @Input() lectureCode?: string;
  isSaving = false;
  constructor(
    private router: Router,
    private page: PageReloadService,
    private toastr: ToastrService,
    private courseRegistrationService: CourseRegistrationService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }
  openVideoModal(content) {
    this.modalService.show(content);
  }
  registrationCourse(courseCode) {
    this.isSaving = true;
    this.courseRegistrationService.registrationCourse(courseCode).subscribe(res => {
      if (res) {
        this.toastr.success('Thành công!', 'Đăng ký thành công!');
        setTimeout(() => {
          this.page.reload(this.router);
        }, 1500);
      } else {
        this.isSaving = false;
        this.toastr.error('Xảy ra lỗi!!', 'Lỗi');
      }
    });
  }
}
