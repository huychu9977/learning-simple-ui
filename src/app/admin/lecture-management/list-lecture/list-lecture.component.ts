import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LectureBO } from 'src/app/models/lectureBO.model';
import { LectureService } from 'src/app/services/lecture.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'list-lecture',
  templateUrl: './list-lecture.component.html'
})
export class ListLectureComponent implements OnInit {
    lecture: LectureBO;
    lectures: LectureBO[];
    totalItems: any;
    itemsPerPage: any = 5;
    page: any = 1;
    keyword = '';
    href?: string;
    constructor(
        private bsModalRef: BsModalRef,
        private lectureService: LectureService,
        private toastr: ToastrService,
        private router: Router) {
            this.href = this.router.url.split('?')[0];
        }

    ngOnInit(): void {
        this.loadAll();
    }
    clear() {
        this.bsModalRef.hide();
    }
    goToLink(code?: string, href?: string) {
        this.clear();
        const link = (code !== 'null') ? `${this.href}/${code}/${href}` : `${this.href}/${href}`;
        this.router.navigate([link], { queryParams: { parentCode: this.lecture.code } });
    }
    setActive(lecture?: LectureBO, isActivated?: boolean) {
        lecture.activated = isActivated;
        this.lectureService.setActive(lecture).subscribe(response => {
            if (response.status === 200) {
                this.toastr.success('Cập nhật trạng thái thành công!', 'Thành công!');
                this.loadAll();
            } else {
                this.toastr.error('Lỗi!', 'Cập nhật trạng thái thất bại?');
            }
        });
    }

    loadPage(event: any) {
        this.page = event.page;
        this.loadAll();
    }

    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }

    deleteLecture() {

    }

    loadAll() {
        this.lectureService
            .queryLectureByParent(this.lecture.code, {
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<LectureBO[]>) => this.onSuccess(res.body)
            );
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.lectures = data.results;
    }
}
