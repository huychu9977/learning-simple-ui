import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/auth/account.service';
import { LoginService } from '../../../core/auth/login.service';
import { LoginModalService } from '../../../core/auth/login-modal.service';
import { PageReloadService } from '../../../core/auth/page-reload.service';
import { SocketService } from 'src/app/core/auth/socket.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  currentAccount: any = null;
  items = [];
  openChat = false;
  isLecturePage = false;
  listNotification?: any[] = [];
  loading = false;
  totalItems: any;
  isNewNotification = false;
  notiSelected?: any = null;
  isOpenDialog = false;
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private scoketService: SocketService,
    private notificationService: NotificationService,
    private router: Router,
    private page: PageReloadService) { }

  ngOnInit() {
    this.init();
    this.scoketService.receiveNotification(res => {
      if (res === 'true') {
        this.isNewNotification = true;
      }
    });
    this.isLecturePage = this.router.url.indexOf('/lecture/') > -1 ? true : false;
  }
  async init() {
    this.currentAccount = await this.accountService.identity();
    this.items = [
      {
        label: 'Đăng nhập', icon: 'fa fa-sign-in', visible: this.currentAccount === null, command: () => {
          this.loginModalService.open();
        }
      },
      {
        label: 'Tài khoản', icon: 'fa fa-cog', routerLink: ['/user/account'], visible: this.currentAccount !== null
      },
      {
        label: 'Đăng ký giảng viên', icon: 'fa fa-graduation-cap', routerLink: ['/instructor'], visible: (this.currentAccount !== null)
        && (this.currentAccount.roleBOs.indexOf('ROLE_TEACHER') === -1) && (this.currentAccount.status === null)
      },
      {
        label: 'Đang chờ kiểm duyệt', disabled: true, icon: 'fa fa-spinner', visible: (this.currentAccount !== null)
        && (this.currentAccount.roleBOs.indexOf('ROLE_TEACHER') === -1) && (this.currentAccount.status === false)
      },
      {
        // tslint:disable-next-line:max-line-length
        label: 'Quản lý khóa học', icon: 'fa fa-graduation-cap', routerLink: ['/instructor/courses'], visible: (this.currentAccount !== null)
        && (this.currentAccount.roleBOs.indexOf('ROLE_TEACHER') > -1)
      },
      {
        label: 'Khóa học của tôi', icon: 'fa fa-graduation-cap', routerLink: ['/account/my-courses'],
         visible: this.currentAccount !== null
      },
      {
        label: 'Đăng xuất', icon: 'fa fa-sign-out', visible: this.currentAccount !== null, command: () => {
          this.loginService.logout();
          if (this.router.url.indexOf('/lecture/') > -1 || this.router.url.indexOf('/user/account/') > -1) {
            window.location.reload();
          } else {
            this.page.reload(this.router);
          }
        }
      }
    ];
  }

  openNotificationDetail(noti) {
    this.notificationService.setIsSeen(noti.id).subscribe(res => {
      if (res === true) {
        noti.isSeen = true;
      }
    });
    this.notiSelected = noti;
    this.isOpenDialog = true;
  }

  openListNotification(event, op) {
    this.loadNotification();
    op.toggle(event);
  }

  loadNotification() {
    this.loading = true;
    this.notificationService.queryForEmployer({
      page: 0,
      size: 10
    }).subscribe(
      (res: HttpResponse<any[]>) => this.onSuccess(res.body),
      (res: HttpResponse<any>) => this.onError(res.body)
    );
  }

  private onSuccess(data) {
    this.loading = false;
    this.isNewNotification = false;
    this.totalItems = data.totalElements;
    this.listNotification = data.content;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listNotification.length ; i++) {
      if (this.listNotification[i].isSent === true) {
        this.isNewNotification = true;
        break;
      }
    }
  }

  private onError(error) {
      this.loading = false;
      console.log(error);
  }
}
