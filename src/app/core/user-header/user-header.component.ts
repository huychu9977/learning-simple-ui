import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../auth/account.service';
import { LoginService } from '../auth/login.service';
import { LoginModalService } from '../auth/login-modal.service';
import { PageReloadService } from '../auth/page-reload.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  currentAccount: any;
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private router: Router,
    private page: PageReloadService) { }

  ngOnInit() {
    this.accountService.identity().then(account => {
        this.currentAccount = account;
    });
  }
  login() {
    this.loginModalService.open();
  }
  logout() {
    this.loginService.logout();
    this.page.reload(this.router);
  }
}
