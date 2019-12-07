import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course?: any;
  rateAvg = 1;
  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.rateAvg = this.course.rateAvg ? parseInt(this.course.rateAvg) : 1;
    this.course.totalVideoDuration = Math.floor(this.course.totalVideoDuration / 60);
  }

}
