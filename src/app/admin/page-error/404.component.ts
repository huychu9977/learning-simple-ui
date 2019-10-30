import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component implements OnInit {
  error403: boolean;
  error404: boolean;
  constructor(private route: ActivatedRoute) { }
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
}
