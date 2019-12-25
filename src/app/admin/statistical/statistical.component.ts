import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { exportCSV } from 'src/app/shared/util/file-util';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/core/auth/account.service';

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
  listUser?: any[] = [];
  loading = false;
  searchType = 'RATE_AVG';
  currentTab = 0;
  isAdmin = false;
  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private accountService: AccountService
    ) { }

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
    this.accountService.hasAuthority('ROLE_ADMIN').then(res => this.isAdmin = res );
  }
  handleChange(e) {
    if (e.index === 1) {
      this.page = 1;
      this.loadAllCourse();
    }
    if (e.index === 2) {
      this.page = 1;
      this.loadAllUser();
    }
    this.currentTab = e.index;
  }

  loadAllUser() {
    this.loading = true;
    this.userService.getListTopUserEnroll({
      page: this.page - 1,
      size: this.itemsPerPage,
      keyword: ''
    }).subscribe(res => {
      this.listUser = res.content;
      this.totalItems = res.totalElements;
      this.loading = false;
      }, err => {this.loading = false; });
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
    if (this.currentTab === 1) {
      this.loadAllCourse();
    }
    if (this.currentTab === 2) {
      this.loadAllUser();
    }
  }

  changeSelect(value) {
    this.searchType = value;
    this.loadAllCourse();
  }

  downloadCSV() {
    this.loading  = true;
    let list = [];
    if (this.currentTab === 1) {
      list = this.listCourse.map(c => {
        return [c.id, c.name, c.imageUrl, c.createdBy, c.topicName, c.totalUserEnroll, c.rateAvg];
      });
    }
    if (this.currentTab === 2) {
      list = this.listUser.map(u => {
        return [u.username, u.name, u.email, u.address, u.phone, u.totalEnrolled];
      });
    }
    exportCSV(list, 'data.csv');
    this.loading  = false;
  }
}
