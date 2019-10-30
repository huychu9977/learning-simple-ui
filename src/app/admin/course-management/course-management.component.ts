import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ToastrService } from 'ngx-toastr';
import { CourseBO } from 'src/app/models/courseBO.model';
import { CourseService } from 'src/app/services/course.service';
import { CategoryService } from 'src/app/services/category.service';
import { AccountService } from 'src/app/core/auth/account.service';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit, OnDestroy {
    isActive = false;
    currentAccount: any;
    courses?: CourseBO[];
    error: any;
    success: any;
    routeData: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    keyword = '';
    courseTopics: any[] = [];
    courseCategorys: any[];
    courseCategoryCode: string = null;
    courseTopicCode: string = null;
    activated: string = null;

    constructor(
        private courseService: CourseService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private toastr?: ToastrService,
    ) {
        this.itemsPerPage = 2;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
        });
        this.courseCategorys = [];
        this.categoryService.getCategories().subscribe(data => {
            this.courseCategorys = data;
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.courseCategoryCode = params.courseCategoryCode ? params.courseCategoryCode : null;
            this.courseTopicCode = params.courseTopicCode ? params.courseTopicCode : null;
            this.activated = params.activated ? params.activated : null;
            this.selectCourseTopics();
        });
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });
        // this.loadAll();
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

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }
    setActive(course?: CourseBO, isActivated?: boolean) {
        course.activated = isActivated;
        this.courseService.setActive(course).subscribe(response => {
            if (response.status === 200) {
                this.toastr.success('Cập nhật trạng thái thành công!', 'Thành công!');
                this.loadPage(this.page);
            } else {
                this.success = null;
                this.error = 'ERROR';
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

    trackIdentity(index, item: CourseBO) {
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
        swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
            buttons: ['Từ chối', 'Đồng ý']
        }).then(confirm => {
            if (confirm) {
                this.courseService.delete(course.code).subscribe(() => {
                    swal('Cập nhật', 'Xóa thành công', 'success').then(
                        () => {
                            if (this.courses.length === 1) {
                                this.page = (this.page === 1) ? 1 : ( this.page - 1);
                            }
                            this.loadPage(this.page);
                        }),
                        // tslint:disable-next-line:no-unused-expression
                        err => {
                            swal('Lỗi', 'Thất bại, hãy thử lại', 'error');
                        };
                });
            }
        });
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.courses = data.results;
    }

    private onError(error) {
        console.log(error);
    }
}
