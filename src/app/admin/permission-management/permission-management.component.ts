import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { PermissionBO } from 'src/app/models/permissionBO.model';
import { PermissionService } from 'src/app/services/permission.service';

const swal: SweetAlert = _swal as any;
@Component({
  selector: 'permission-management',
  templateUrl: './permission-management.component.html'
})
export class PermissionManagementComponent implements OnInit, OnDestroy {

    currentAccount: any;
    permissions?: PermissionBO[];
    error: any;
    success: any;
    routeData: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    keyword = '';
    constructor(
        private permissionService: PermissionService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 2;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        // this.accountService.identity().then(account => {
        //     this.currentAccount = account;
        //     this.loadAll();
        // });
        this.loadAll();
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    loadAll() {
        this.permissionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<PermissionBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    trackIdentity(index, item: PermissionBO) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
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
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        };
        if (this.keyword === '' || !this.keyword) { delete param.keyword; }
        this.router.navigate(['/admin/permission-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }
    deletePermission(permission: PermissionBO) {
        swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
            buttons: ['Từ chối', 'Đồng ý']
        }).then(confirm => {
            if (confirm) {
                this.permissionService.delete(permission.code).subscribe(() => {
                    swal('Cập nhật', 'Xóa thành công', 'success').then(
                        () => {
                            this.loadAll();
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
        this.permissions = data.results;
    }

    private onError(error) {
        console.log(error);
    }

}
