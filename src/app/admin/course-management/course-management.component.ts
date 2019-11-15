import { STATUS_CAN_NOT_EIDT_DELETE, STATUS_NEED_CHECK } from './../../shared/constants/status.constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CourseBO } from 'src/app/models/courseBO.model';
import { CourseService } from 'src/app/services/course.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit {
    isActive = false;
    courses?: CourseBO[];
    totalItems: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    keyword = '';
    courseTopics: any[] = [];
    courseCategorys: any[];
    courseCategoryCode: string = null;
    courseTopicCode: string = null;
    activated: string = null;
    statusCanNotEditAndDelete = STATUS_CAN_NOT_EIDT_DELETE;
    statusNeedCheck = STATUS_NEED_CHECK;
    loading = false;
    constructor(
        private messageService: MessageService,
        private courseService: CourseService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 5;
        this.courseCategorys = [];
        this.categoryService.getCategories().subscribe(data => {
            this.courseCategorys = data;
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.page = params.page || 1;
            this.previousPage = params.page || 1;
            this.keyword = params.keyword || '';
            this.courseCategoryCode = params.courseCategoryCode ? params.courseCategoryCode : null;
            this.courseTopicCode = params.courseTopicCode ? params.courseTopicCode : null;
            this.activated = params.activated ? params.activated : null;
            this.selectCourseTopics();
        });
    }

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
    selectCourseTopics() {
        if (this.courseCategoryCode) {
          this.categoryService.getTopics(this.courseCategoryCode).subscribe(data => {
            this.courseTopics = data;
          });
        } else {
          this.courseTopics = [];
        }
    }

    toggleAccordian(event) {
        const element = event.target;
        element.classList.toggle('active');
        this.isActive = !this.isActive;
        const panel = element.parentElement.parentElement.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    setActive(course?: CourseBO, isActivated?: boolean) {
        course.activated = isActivated;
        this.courseService.setActive(course).subscribe(response => {
            if (response.status === 200) {
                this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Cập nhật trạng thái thành công!'});
                this.loadPage(this.page);
            } else {
                console.log('ERROR');
            }
        });
    }

    loadAll() {
        const param = {
            page: this.page - 1,
            size: this.itemsPerPage,
            keyword: this.keyword,
            courseTopicCode: this.courseTopicCode,
            courseCategoryCode: this.courseCategoryCode,
            activated: this.activated
        };
        if (this.keyword === '' || !this.keyword) { delete param.keyword; }
        if (this.courseTopicCode === 'null' || !this.courseTopicCode) { delete param.courseTopicCode; }
        if (this.courseCategoryCode === 'null' || !this.courseCategoryCode) { delete param.courseCategoryCode; }
        if (this.activated === 'null' || !this.activated) { delete param.activated; }
        this.courseService
            .query(param)
            .subscribe(
                (res: HttpResponse<CourseBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    loadPage(event: any) {
        this.page = event.page + 1;
        if (this.page !== this.previousPage) {
            this.transition();
            this.previousPage = this.page;
        }
    }

    transition() {
        const param = {
            page: this.page,
            keyword: this.keyword,
            courseTopicCode: this.courseTopicCode,
            courseCategoryCode: this.courseCategoryCode,
            activated: this.activated
        };
        if (this.keyword === '' || !this.keyword) { delete param.keyword; }
        if (this.courseTopicCode === 'null' || !this.courseTopicCode) { delete param.courseTopicCode; }
        if (this.courseCategoryCode === 'null' || !this.courseCategoryCode) { delete param.courseCategoryCode; }
        if (this.activated === 'null' || !this.activated) { delete param.activated; }
        this.router.navigate(['/admin/course-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search() {
        this.page = 1;
        const param = {
            keyword: this.keyword,
            courseTopicCode: this.courseTopicCode,
            courseCategoryCode: this.courseCategoryCode,
            activated: this.activated
        };
        if (this.keyword === '' || !this.keyword) { delete param.keyword; }
        if (this.courseTopicCode === 'null' || !this.courseTopicCode) { delete param.courseTopicCode; }
        if (this.courseCategoryCode === 'null' || !this.courseCategoryCode) { delete param.courseCategoryCode; }
        if (this.activated === 'null' || !this.activated) { delete param.activated; }
        this.router.navigate(['/admin/course-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    deleteCourse(course: CourseBO) {
        // swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
        //     buttons: ['Từ chối', 'Đồng ý']
        // }).then(confirm => {
        //     if (confirm) {
        //         this.courseService.delete(course.code).subscribe(() => {
        //             swal('Cập nhật', 'Xóa thành công', 'success').then(
        //                 () => {
        //                     if (this.courses.length === 1) {
        //                         this.page = (this.page === 1) ? 1 : ( this.page - 1);
        //                     }
        //                     this.loadPage(this.page);
        //                 }),
        //                 // tslint:disable-next-line:no-unused-expression
        //                 err => {
        //                     swal('Lỗi', 'Thất bại, hãy thử lại', 'error');
        //                 };
        //         });
        //     }
        // });
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.courses = data.results;
    }

    private onError(error) {
        console.log(error);
    }

    loadCarsLazy(event: any) {
        this.loading = true;
        setTimeout(() => {
            if (this.courses) {
                this.loading = false;
            }
        }, 1000);
    }
}
