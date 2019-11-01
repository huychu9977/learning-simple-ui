import { LectureBO } from './../../models/lectureBO.model';
import { ListLectureComponent } from './list-lecture/list-lecture.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ToastrService } from 'ngx-toastr';
import { CourseBO } from 'src/app/models/courseBO.model';
import { LectureService } from 'src/app/services/lecture.service';
import { BsModalService } from 'ngx-bootstrap';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'lecture-management',
  templateUrl: './lecture-management.component.html',
  styleUrls: ['./lecture-management.component.scss']
})
export class LectureManagementComponent implements OnInit, OnDestroy {
    course: CourseBO;
    currentAccount: any;
    courseLectures?: LectureBO[];
    error: any;
    success: any;
    routeData: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    keyword = '';
    constructor(
        private lectureService: LectureService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService,
        private toastr?: ToastrService,
    ) {
        this.itemsPerPage = 2;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
        });
    }

    ngOnInit() {
        // this.accountService.identity().then(account => {
        //     this.currentAccount = account;
        //     this.loadAll();
        // });
        this.activatedRoute.data.subscribe(({ course }) => {
          this.course = course.body ? course.body : course;
        });
        this.loadAll();
    }
    openModal(lecture?: LectureBO) {
        const modalRef = this.modalService.show(ListLectureComponent);
        modalRef.content.lecture = lecture;
    }
    ngOnDestroy() {
        this.routeData.unsubscribe();
    }
    setActive(lecture?: LectureBO, isActivated?: boolean) {
        lecture.activated = isActivated;
        this.lectureService.setActive(lecture).subscribe(response => {
            if (response.status === 200) {
                this.toastr.success('Cập nhật trạng thái thành công!', 'Thành công!');
                this.loadAll();
            } else {
                this.toastr.error('Lỗi!', 'Cập nhật trạng thái thất bại?');
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        this.lectureService
            .query({
                courseCode: this.course.code,
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<LectureBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    trackIdentity(index, item: LectureBO) {
        return item.id;
    }

    loadPage(event: any) {
        if (event.page !== this.previousPage) {
            this.transition();
            this.previousPage = event.page;
        }
    }

    transition() {
        const param = {
            page: this.page,
            keyword: this.keyword
        };
        if (this.keyword === '' || !this.keyword) { delete param.keyword; }
        this.router.navigate(['/admin/course-management', this.course.code, 'lecture'], {
            queryParams: param
        });
        this.loadAll();
    }
    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }
    deleteLecture(lecture: LectureBO) {
        swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
            buttons: ['Từ chối', 'Đồng ý']
        }).then(confirm => {
            // if (confirm) {
            //     this.lectureService.canDeleted(lecture.code).subscribe(data => {
            //         if(data) {
            //             this.lectureService.delete(lecture.code).subscribe(() => {
            //                 swal('Cập nhật', 'Xóa thành công', 'success').then(
            //                     () => {
            //                         if(this.courseLectures.length === 1) {
            //                             this.page = (this.page === 1) ? 1 : ( this.page - 1);
            //                         }
            //                         this.loadAll();
            //                     }),
            //                     err => {
            //                         swal('Lỗi', 'Thất bại, hãy thử lại', 'error');
            //                     }
            //             })
            //         } else {
            //             swal('Cảnh báo', 'Bạn phải xóa các bài học con trước !', 'error').then(
            //                 () => {
            //                 })
            //         }
            //     });
            // }
        });
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.courseLectures = data.results;
    }

    private onError(error) {
        console.log(error);
    }

}
