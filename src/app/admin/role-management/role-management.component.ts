import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { RoleMgmtDetailComponent } from './role-management-detail.component';
import { RoleBO } from 'src/app/models/roleBO.model';
import { BsModalService } from 'ngx-bootstrap';
import { RoleService } from 'src/app/services/role.service';

const swal: SweetAlert = _swal as any;
@Component({
  selector: 'role-management',
  templateUrl: './role-management.component.html'
})
export class RoleManagementComponent implements OnInit, OnDestroy {

  currentAccount: any;
    roles?: RoleBO[];
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
        private modalService: BsModalService,
        private roleService: RoleService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 2;
        this.routeData = this.activatedRoute.queryParams.subscribe(params => {
            this.page = params.page || 1;
            this.previousPage = params.page || 1;
            this.keyword = params.keyword || '';
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
        this.roleService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<RoleBO[]>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    trackIdentity(index, item: RoleBO) {
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
        this.router.navigate(['/admin/role-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }
    deleteRole(role: RoleBO) {
        swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
            buttons: ['Từ chối', 'Đồng ý']
        }).then(confirm => {
            if (confirm) {
                this.roleService.delete(role.code).subscribe(() => {
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
    openModalDetail(role?: RoleBO) {
        const modalRef = this.modalService.show(RoleMgmtDetailComponent);
        modalRef.content.role = role;
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.roles = data.results;
    }

    private onError(error) {
        console.log(error);
    }

}
