import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-page-my-course',
  templateUrl: './page-my-course.component.html',
  styleUrls: ['./page-my-course.component.scss']
})
export class PageMyCourseComponent implements OnInit {
  page = 1;
  previousPage = 1;
  itemsPerPage = 5;
  totalItems;
  courses?: any[];
  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.courseService
    .queryMyCourses({
        page: this.page - 1,
        size: this.itemsPerPage
    })
    .subscribe(
        (res: HttpResponse<any>) => this.onSuccess(res.body),
        (res: HttpResponse<any>) => console.log(res.body)
    );
  }
  private onSuccess(data) {
    this.totalItems = data.totalResult;
    this.courses = data.results;
  }
  loadPage(event: any) {
    this.page = event.page;
    if (event.page !== this.previousPage) {
        this.loadAll();
        this.previousPage = event.page;
    }
  }
}
