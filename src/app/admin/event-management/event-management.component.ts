import { Component, OnInit } from '@angular/core';
import { EventBO } from 'src/app/models/eventBO.model';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {

  events?: EventBO[] = [];
  totalItems: any;
  itemsPerPage: any;
  page: any;
  previousPage: any;
  keyword = '';
    constructor(
        private eventService: EventService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 2;
        this.activatedRoute.queryParams.subscribe(params => {
            this.page = params.page || 1;
            this.previousPage = params.page || 1;
            this.keyword = params.keyword || '';
        });
    }

    ngOnInit() {
        this.loadAll();
    }

    setActive(event?: EventBO, isActivated?: boolean) {
      event.activated = isActivated;
        // this.eventService.setActive(event).subscribe(response => {
        //     if (response.status === 200) {
        //         this.toastr.success('Cập nhật trạng thái thành công!', 'Thành công!');
        //         this.loadAll();
        //     } else {
        //         this.toastr.error('Lỗi!', 'Cập nhật trạng thái thất bại?');
        //         this.error = 'ERROR';
        //     }
        // });
    }

    loadAll() {
        this.eventService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<EventBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }
    loadPage(event: any) {
        this.page = event.page;
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
        this.router.navigate(['/admin/event-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }
    deleteLecture(lecture: EventBO) {
        // swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
        //     buttons: ['Từ chối', 'Đồng ý']
        // }).then(confirm => {
        //     if (confirm) {
        //         this.lectureService.canDeleted(lecture.code).subscribe(data => {
        //             if(data) {
        //                 this.lectureService.delete(lecture.code).subscribe(() => {
        //                     swal('Cập nhật', 'Xóa thành công', 'success').then(
        //                         () => {
        //                             if(this.courseLectures.length === 1) {
        //                                 this.page = (this.page === 1) ? 1 : ( this.page - 1);
        //                             }
        //                             this.loadAll();
        //                         }),
        //                         err => {
        //                             swal('Lỗi', 'Thất bại, hãy thử lại', 'error');
        //                         }
        //                 })
        //             } else {
        //                 swal('Cảnh báo', 'Bạn phải xóa các bài học con trước !', 'error').then(
        //                     () => {
        //                     })
        //             }
        //         });
        //     }
        // });
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.events = data.results;
    }

    private onError(error) {
        console.log(error);
    }
    previousState() {
        window.history.back();
    }

}
