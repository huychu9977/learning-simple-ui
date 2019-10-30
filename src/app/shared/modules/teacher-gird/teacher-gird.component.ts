import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'teacher-gird',
  templateUrl: './teacher-gird.component.html',
  styles: []
})
export class TeacherGirdComponent implements OnInit {
  @Input() slideT?: any;
  constructor() { }

  ngOnInit() {
  }

}
