import { STATUS_CAN_NOT_EIDT_DELETE } from './../../shared/constants/status.constants';
import { LectureBO } from './../../models/lectureBO.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CourseBO } from 'src/app/models/courseBO.model';
import { LectureService } from 'src/app/services/lecture.service';
import { MessageService, DialogService, ConfirmationService } from 'primeng/api';
import { ListLectureComponent } from './list-lecture/list-lecture.component';

@Component({
  selector: 'lecture-management',
  templateUrl: './lecture-management.component.html',
  styleUrls: ['./lecture-management.component.scss']
})
export class LectureManagementComponent implements OnInit {
    course: CourseBO;
    lectures?: LectureBO[];
    totalItems: any;
    itemsPerPage: any = 2;
    page: any = 1;
    keyword = '';
    loading = false;
    statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
    constructor(
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private lectureService: LectureService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ course }) => {
          this.course = course.body ? course.body : course;
        });
        this.loadAll();
    }
    openModal(lecture?: LectureBO) {
        this.dialogService.open(ListLectureComponent, {
            data: {
                lecture,
                courseStatus: this.course.status,
                chapterStatus: lecture.status
            },
            header: 'Danh sách bài học',
            closeOnEscape: false,
            width: '80%'
        });
    }

    setActive(lecture?: LectureBO) {
        this.loading = true;
        this.lectureService.setActive(lecture).subscribe(response => {
            if (response.status === 200) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Cập nhật trạng thái thành công!'});
                this.loadAll();
            } else {
                console.log('error');
                this.loading = false;
            }
        });
    }

    loadAll() {
        this.loading = true;
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

    loadPage(event: any) {
        this.page = event.page + 1;
        this.loadAll();
    }

    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }

    deleteLecture(lecture: LectureBO) {
        this.confirmationService.confirm({
            message: 'Đồng ý thực hiện thao tác này?',
            accept: () => {
                this.lectureService.delete(lecture.code).subscribe(res => {
                    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Xoá khóa học thành công!'});
                },
                err => {
                    this.messageService.add({severity: 'error', detail: err.error.message});
                });
            }
        });
    }

    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.lectures = data.results;
        this.loading = false;
    }

    private onError(error) {
        console.log(error);
        this.loading = false;
    }

    previousState() {
        window.history.back();
    }
}
