import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/auth/login.service';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component implements OnInit {
  error403: boolean;
  error404: boolean;
  constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router) { }
  ngOnInit() {
    this.route.data.subscribe(routeData => {
      if (routeData.error403) {
        this.error403 = routeData.error403;
      }
      if (routeData.error404) {
        this.error404 = routeData.error404;
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/admin/login']);
  }
}
