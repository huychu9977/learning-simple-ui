import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  currentAccount: any;
  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
  }

}
