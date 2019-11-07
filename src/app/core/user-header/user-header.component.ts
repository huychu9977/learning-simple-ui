import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  currentAccount: any;
  notifications: any[] = [];
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private commentService: CommentService,
    private loginModalService: LoginModalService,
    private router: Router,
    private page: PageReloadService) { }

  ngOnInit() {
    this.accountService.identity().then(account => {
        this.currentAccount = account;
        this.commentService.getNotifications().subscribe(res => {
          this.notifications = res;
        });
    });
  }
  isShowNotification() {
    return this.currentAccount && this.notifications.length > 0 && !this.router.url.includes('/lecture/');
  }
  login() {
    this.loginModalService.open();
  }
  logout() {
    this.loginService.logout();
    if (this.router.url.indexOf('/lecture/') > -1) {
      window.location.reload();
    } else {
      this.page.reload(this.router);
    }
  }
}
