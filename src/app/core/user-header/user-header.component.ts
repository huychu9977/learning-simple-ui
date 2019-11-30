import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../auth/account.service';
import { LoginService } from '../auth/login.service';
import { LoginModalService } from '../auth/login-modal.service';
import { PageReloadService } from '../auth/page-reload.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  currentAccount: any = null;
  notifications: any[] = [];
  items = [];
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private commentService: CommentService,
    private loginModalService: LoginModalService,
    private router: Router,
    private page: PageReloadService) { }

  ngOnInit() {
    this.init();
  }
  async init() {
    this.currentAccount = await this.accountService.identity();
    this.commentService.getNotifications().subscribe(res => {
      this.notifications = res;
    });
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
  isShowNotification() {
    return this.currentAccount && this.notifications.length > 0 && !this.router.url.includes('/lecture/');
  }
}
