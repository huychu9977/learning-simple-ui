import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  action = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.action = params.action ? params.action : null;
      if (this.action && this.action !== 'create' && this.action !== 'edit') {
         this.router.navigate(['/instructor/courses']);
         return;
      }
      if (params.code && this.action === 'create') {
        this.router.navigate(['/instructor/courses']);
        return;
      }
    });
  }
}
