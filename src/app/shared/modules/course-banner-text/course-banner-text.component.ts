import { Component, OnInit, Input } from '@angular/core';
import { CourseBO } from 'src/app/models/courseBO.model';
@Component({
  selector: 'course-banner-text',
  templateUrl: './course-banner-text.component.html',
  styleUrls: ['./course-banner-text.component.scss']
})
export class CourseBannerTextComponent implements OnInit {
  @Input() course?: CourseBO;
  @Input() rateAvg: any;
  @Input() rateAvgRound: any;
  @Input() totalUserEnroll: any;
  constructor() { }

  ngOnInit() {
  }

}
