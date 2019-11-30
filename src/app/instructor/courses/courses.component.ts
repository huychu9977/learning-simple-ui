import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentPage = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.hasAuthority('ROLE_TEACHER').then(id => {
      if (!id) {
        this.router.navigate(['not-found']);
      }
    });
    this.route
      .data
      .subscribe(v => this.currentPage = v.currentPage);
  }
}
