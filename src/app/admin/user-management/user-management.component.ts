import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserBO } from 'src/app/models/userBO.model';
import { UserService } from 'src/app/services/user.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
    users?: UserBO[] = [];
    totalItems: any;
    itemsPerPage: any;
    page: any;
    previousPage: any;
    keyword = '';
    constructor(
        public dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 5;
        this.route.queryParams.subscribe(params => {
            this.page = params.page || 1;
            this.previousPage = params.page || 1;
            this.keyword = params.keyword || '';
          });
    }

    ngOnInit() {
        this.loadAll();
    }

    setActive(user?: UserBO, isActivated?: boolean) {
        user.activated = isActivated;
        delete user.imageUrl;
        delete user.modifiedAt;
        delete user.createdAt;
        const formdata: FormData = new FormData();
        formdata.append('userDTO', new Blob([JSON.stringify(user)], {
        type: 'application/json'
        }));
        this.userService.updateWithImage(formdata).subscribe(response => {
            if (response.status === 200) {
                this.loadAll();
            } else {
            }
        });
    }

    loadAll() {
        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<UserBO[]>) => this.onSuccess(res.body),
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
        this.router.navigate(['/admin/user-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search() {
        this.page = 1;
        this.transition();
    }
    deleteUser(user: UserBO) {
        this.confirmationService.confirm({
            message: 'Đồng ý thực hiện thao tác này?',
            accept: () => {
                this.userService.delete(user.username).subscribe(() => {
                    this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
                    this.loadAll();
                },
                (err) => {
                    this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
                });
            }
          });
    }
    openModalDetail(user?: UserBO) {
        this.dialogService.open(UserMgmtDetailComponent, {
            data: {
                user
            },
            header: 'Chi tiết người dùng',
            closeOnEscape: false,
            width: '70%'
        });
    }
    private onSuccess(data) {
        this.totalItems = data.totalElements;
        this.users = data.content;
    }

    private onError(error) {
        console.log(error);
    }

}
