import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { exportCSV } from 'src/app/shared/util/file-util';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  data: any;
  totalItems: any;
  itemsPerPage: any = 10;
  page: any = 1;
  listCourse?: any[] = [];
  loading = false;
  searchType = 'RATE_AVG';
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.data = {
      datasets: [{
          data: [
              100,
              300,
              50,
              250,
              80
          ],
          backgroundColor: [
              '#FF6384',
              '#4BC0C0',
              '#FFCE56',
              '#E7E9ED',
              '#36A2EB'
          ],
          label: 'My dataset'
      }],
      labels: [
          'Red',
          'Green',
          'Yellow',
          'Grey',
          'Blue'
      ]
    };
  }
  handleChange(e) {
    if (e.index === 1) {
      this.loadAllCourse();
    }
  }
  loadAllCourse() {
    this.loading = true;
    if (this.searchType === 'TOTAL_ENROLL') {
      this.courseService.getListCoursePopular({
        page: this.page - 1,
        size: this.itemsPerPage
      }).subscribe(res => {
        this.listCourse = res.content;
        this.totalItems = res.totalElements;
        this.loading = false;
      }, err => {this.loading = false; });
    } else if (this.searchType === 'RATE_AVG') {
      this.courseService.getListCourseMostRating({
        page: this.page - 1,
        size: this.itemsPerPage
      }).subscribe(res => {
        this.listCourse = res.content;
        this.totalItems = res.totalElements;
        this.loading = false;
      }, err => {this.loading = false; });
    }
  }

  loadPage(event) {
    this.page = event.page + 1;
    this.loadAllCourse();
  }

  changeSelect(value) {
    this.searchType = value;
    this.loadAllCourse();
  }

  downloadCSV() {
    this.loading  = true;
    const list = this.listCourse.map(c => {
      return [c.id, c.name, c.imageUrl, c.createdBy, c.topicName, c.totalUserEnroll, c.rateAvg];
    });
    exportCSV(list, 'data.csv');
    this.loading  = false;
  }
}
