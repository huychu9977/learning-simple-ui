import { STATUS_CAN_NOT_EIDT_DELETE, STATUS_NEED_CHECK } from './../../shared/constants/status.constants';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CourseBO } from 'src/app/models/courseBO.model';
import { CourseService } from 'src/app/services/course.service';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit {
    courses?: CourseBO[] = [];
    totalItems: any;
    itemsPerPage: any = 5;
    page: any = 1;
    keyword = '';
    statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
    statusNeedCheck = STATUS_NEED_CHECK;
    loading = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        this.loadAll();
    }
    setStatus(courseCode?: string) {
        this.courseService.setStatus(courseCode).subscribe(res => {
            if (res) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Trong thời gian chờ duyệt!'});
                this.loadAll();
            } else {
                this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: 'Xét duyệt thất bại!'});
            }
        });
    }

    setActive(course?: CourseBO) {
        this.loading = true;
        this.courseService.setActive(course).subscribe(response => {
            if (response.status === 200 && response) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Cập nhật trạng thái thành công!'});
                this.loadAll();
            } else {
                console.log('ERROR');
                this.loading = false;
            }
        });
    }

    loadAll() {
        this.loading = true;
        const param = {
            page: this.page - 1,
            size: this.itemsPerPage,
            keyword: this.keyword
        };
        this.courseService
            .queryForInstructor(param)
            .subscribe(
                (res: HttpResponse<CourseBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => console.log(res.body)
            );
    }

    loadPage(event: any) {
        this.page = event.page + 1;
        this.loadAll();
    }

    search() {
        this.page = 1;
        this.loadAll();
    }
    deleteCourse(course: CourseBO) {
        this.confirmationService.confirm({
            message: 'Đồng ý thực hiện thao tác này?',
            accept: () => {
                this.courseService.delete(course.code).subscribe(res => {
                    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Xoá khóa học thành công!'});
                },
                err => {
                    this.messageService.add({severity: 'error', detail: err.error.message});
                });
            }
        });
    }
    private onSuccess(data) {
        this.totalItems = data.totalElements;
        this.courses = data.content;
        this.loading = false;
    }
}
