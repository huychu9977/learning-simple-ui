import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-teacher',
  templateUrl: './page-teacher.component.html',
  styleUrls: ['./page-teacher.component.scss']
})
export class PageTeacherComponent implements OnInit {
  page = 0;
  itemsPerPage = 20;
  totalItems: any = 100;
  items = [1, 2, 3];
  constructor() { }

  ngOnInit() {
  }
  loadPage(page: number) {
  }
}
