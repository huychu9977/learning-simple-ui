import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styles: []
})
export class CourseListComponent implements OnInit {

  @Input() course?: any;
  rateAvg = 1;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.rateAvg = this.course.rateAvg ? parseInt(this.course.rateAvg) : 1;
  }

}
