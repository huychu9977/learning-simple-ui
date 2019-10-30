import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'course-will-learn',
  templateUrl: './course-will-learn.component.html',
  styleUrls: ['./course-will-learn.component.scss']
})
export class CourseWillLearnComponent implements OnInit, AfterContentChecked  {

  @Input() objectives?: any[];
  @ViewChild('courseWillLearnE', {static: false}) courseWillLearnElement?: ElementRef;
  courseWillLearnMore = false;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
