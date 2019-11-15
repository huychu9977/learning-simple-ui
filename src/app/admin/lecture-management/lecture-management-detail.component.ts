import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lecture-management-detail',
  templateUrl: './lecture-management-detail.component.html',
})
export class LectureManagementDetailComponent implements OnInit {
  status = 9;
  isChecking = false;
  message = '';
  lecture?: any;
  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ lecture }) => {
      this.lecture = lecture.body ? lecture.body : lecture;
      this.ticketService.findByFollowByAndLectureId(this.lecture.id).subscribe(res => {
        if (res && res.id) {
          this.isChecking = true;
        }
      });
    });
  }
  setStatusLecture(template) {
   // this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    const body = {
      lectureId: this.lecture.id,
      message: this.message,
      status: this.status
    };
    this.ticketService.setStatusLecture(body).subscribe(res => {
      if (res) {
       // this.modalRef.hide();
       // this.toastr.success('Thay đổi trạng thái thành công!');
      } else {
       // this.modalRef.hide();
       // this.toastr.error('Thất bại!');
      }
    });
  }

  decline(): void {
  //  this.modalRef.hide();
  }
}
