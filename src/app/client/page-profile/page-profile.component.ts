import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  currentAccount: any;
  currentRouter;
  data: any[] = [
    {name: 'Quản lý khoá học', url: 'instructor', active: false},
    {name: 'Thông tin', url: '', active: true}
  ];
  data1: any[] = [
    {name: 'Trang chủ', url: '/home', active: false},
    {name: 'Thông tin', url: '', active: true}
  ];
  constructor(
    private router: Router,
    private accountService: AccountService) {}

  ngOnInit() {
     // this.accountService.identity().then(account => {
    //   if (!account || account.roleBOs.indexOf('ROLE_TEACHER') === -1) {
    //     this.router.navigate(['/not-found']);
    //     return;
    //   }

    // }).catch(() => {
    //   this.router.navigate(['/not-found']);
    // });
    this.currentRouter = this.router;
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
  }

}
