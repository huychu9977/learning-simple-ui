import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserBO } from 'src/app/models/userBO.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    currentAccount: any;
    users?: UserBO[];
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    keyword = '';
    constructor(
        private modalService: BsModalService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = 2;
        this.route.queryParams.subscribe(params => {
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

    setActive(user?: UserBO, isActivated?: boolean) {
        user.activated = isActivated;
        delete user.imageDTO;
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

    trackIdentity(index, item: UserBO) {
        return item.id;
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
        this.router.navigate(['/admin/user-management'], {
            queryParams: param
        });
        this.loadAll();
    }
    search(value?: string) {
        this.keyword = value;
        this.page = 1;
        this.loadAll();
    }
    deleteUser(user: UserBO) {
        swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
            buttons: ['Từ chối', 'Đồng ý']
        }).then(confirm => {
            if (confirm) {
                this.userService.delete(user.username).subscribe(() => {
                    swal('Cập nhật', 'Xóa thành công', 'success').then(
                        () => {
                            if (this.users.length === 1) {
                                this.page = (this.page === 1) ? 1 : ( this.page - 1);
                            }
                            this.loadPage(this.page);
                        }),
                        // tslint:disable-next-line:no-unused-expression
                        () => {
                            swal('Lỗi', 'Thất bại, hãy thử lại', 'error');
                        };
                });
            }
        });
    }
    openModalDetail(user?: UserBO) {
        const modalRef = this.modalService.show(UserMgmtDetailComponent, {class: 'modal-lg'});
        modalRef.content.user = user;
    }
    private onSuccess(data) {
        this.totalItems = data.totalResult;
        this.users = data.results;
    }

    private onError(error) {
        console.log(error);
    }

}
