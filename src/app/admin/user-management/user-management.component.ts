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
export class UserManagementComponent implements OnInit, OnDestroy {

  currentAccount: any;
    users?: UserBO[];
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
        private userService: UserService,
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
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                keyword: this.keyword
            })
            .subscribe(
                (res: HttpResponse<UserBO[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    trackIdentity(index, item: UserBO) {
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
        const modalRef = this.modalService.show(UserMgmtDetailComponent);
        modalRef.content.myContent = user;
    }
    private onSuccess(data, headers) {
        this.totalItems = headers.get('X-Total-Count');
        this.users = data;
    }

    private onError(error) {
        console.log(error);
    }

}
