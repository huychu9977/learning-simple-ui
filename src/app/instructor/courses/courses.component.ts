import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentPage = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(v => this.currentPage = v.currentPage);
  }
}
