import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course?: any;
  rateAvg;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.rateAvg = parseInt(this.course.rateAvg);
  }

}
