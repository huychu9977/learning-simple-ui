import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LectureBO } from 'src/app/models/lectureBO.model';
import { LectureService } from 'src/app/services/lecture.service';
import { STATUS_CAN_NOT_EIDT_DELETE, CHECKING } from 'src/app/shared/constants/status.constants';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AccountService } from 'src/app/core/auth/account.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'list-lecture',
  templateUrl: './list-lecture.component.html'
})
export class ListLectureComponent implements OnInit {
    lecture: LectureBO;
    courseStatus: any;
    chapterStatus: any;
    lectures: LectureBO[];
    totalItems: any;
    itemsPerPage: any = 5;
    page: any = 1;
    keyword = '';
    href?: string;
    isChecking = false;
    loading = false;
    CHECKING = CHECKING;
    statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private lectureService: LectureService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private router: Router) {
            this.href = this.router.url.split('?')[0];
        }

    ngOnInit(): void {
        this.lecture = this.config.data.lecture;
        this.courseStatus = this.config.data.courseStatus;
        this.chapterStatus = this.config.data.chapterStatus;
        this.isChecking = this.config.data.isChecking;
        this.loadAll();
    }

    clear() {
        this.ref.close();
    }

    goToLink(code?: string, href?: string) {
        this.clear();
        const link = (code !== 'null') ? `${this.href}/${code}/${href}` : `${this.href}/${href}`;
        this.router.navigate([link], { queryParams: { parentCode: this.lecture.code } });
    }

    setActive(lecture?: LectureBO) {
        this.lectureService.setActive(lecture).subscribe(response => {
            if (response.status === 200) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Cập nhật trạng thái thành công!'});
                this.loadAll();
            } else {
                console.log('error');
            }
        });
    }

    setStatus(code?: string, status?: string) {
        this.lectureService.setStatus(code, status).subscribe(res => {
            if (res) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thành công!'});
                this.loadAll();
            } else {
                this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: 'Xét duyệt thất bại!'});
            }
        });
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

    deleteLecture(lecture?: LectureBO) {
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

    loadAll() {
        this.loading = true;
        this.lectureService
            .queryLectureByChapter(this.lecture.code, {
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<LectureBO[]>) => this.onSuccess(res.body),
                (err) => {this.loading = false; }
            );
    }
    private onSuccess(data) {
        this.totalItems = data.totalElements;
        this.lectures = data.content;
        this.loading = false;
    }
}
