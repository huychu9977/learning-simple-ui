import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-gird',
  templateUrl: './course-gird.component.html',
  styles: []
})
export class CourseGirdComponent implements OnInit {
  @Input() data?: any;
  constructor() { }

  ngOnInit() {
  }

}
