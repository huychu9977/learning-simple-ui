import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleMgmtDetailComponent } from './role-management-detail.component';
import { RoleBO } from 'src/app/models/roleBO.model';
import { RoleService } from 'src/app/services/role.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'role-management',
  templateUrl: './role-management.component.html'
})
export class RoleManagementComponent implements OnInit, OnDestroy {
    roles?: RoleBO[];
    routeData: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    keyword = '';
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
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
        this.confirmationService.confirm({
            message: 'Đồng ý thực hiện thao tác này?',
            accept: () => {
                this.roleService.delete(role.code).subscribe(() => {
                    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
                    this.loadAll();
                },
                (err) => {
                    this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
                });
            }
          });
    }
    openModalDetail(role?: RoleBO) {
      //  const modalRef = this.modalService.show(RoleMgmtDetailComponent);
      //  modalRef.content.role = role;
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.roles = data.results;
    }

    private onError(error) {
        console.log(error);
    }

}
