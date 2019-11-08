import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'course-management-detail',
  templateUrl: './course-management-detail.component.html'
})
export class CourseManagementDetailComponent implements OnInit {
  modalRef: BsModalRef;
  course?: any;
  status = 9;
  isChecking = false;
  message = '';
  constructor(
    private modalService: BsModalService,
    private ticketService: TicketService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ course }) => {
      this.course = course.body ? course.body : course;
      this.ticketService.findByFollowByAndCourseId(this.course.id).subscribe(res => {
        if (res && res.id) {
          this.isChecking = true;
        }
      });
    });
  }
  setStatusCourse(template) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    const body = {
      courseId: this.course.id,
      message: this.message,
      status: this.status
    };
    this.ticketService.setStatusCourse(body).subscribe(res => {
      if (res) {
        this.modalRef.hide();
        this.toastr.success('Thay đổi trạng thái thành công!');
      } else {
        this.modalRef.hide();
        this.toastr.error('Thất bại!');
      }
    });
  }

  decline(): void {
    this.modalRef.hide();
  }
}
