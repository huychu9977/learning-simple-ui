import { ReviewService } from './../../../services/review.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ReviewBO } from 'src/app/models/reviewBO.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss']
})
export class CourseReviewsComponent implements OnInit {
  courseCode?: string;
  keyword = '';
  page = 1;
  itemsPerPage = 5;
  totalItems: any;
  reviews: ReviewBO[] = [];
  starSelected = [];
  starNumber = 0;
  colors = ['#f4c150', '#76c5d6', '#686f7a', '#00576b'];
  ratesTmp: any[] = [];
  loading = false;
  @Input() rates: any[] = [];
  @Input() rateAvg: any;
  @Input() rateAvgRound?: any = 0;
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
    ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseCode = params['course-code'];
      this.loadAll();
    });
    for (const star of [5, 4, 3, 2, 1]) {
      const rate = this.getRate(star);
      if (rate) {
        this.ratesTmp = [...this.ratesTmp, {starNumber: rate.starNumber, percent: rate.percent}];
      } else {
        this.ratesTmp = [...this.ratesTmp, {starNumber: star, percent: 0}];
      }
    }
  }
  getRate(star): any {
    return this.rates.filter(rate => rate.starNumber === star)[0];
  }
  setDeactive(i) {
    if (5 - i === this.starNumber) {
      this.starNumber = 0;
      this.starSelected = [];
    } else {
      this.starSelected = [1, 2, 3, 4, 5];
      this.starSelected.splice(i, 1);
      this.starNumber = 5 - i;
    }
    this.loadAll();
  }
  search() {
    this.page = 1;
    this.loadAll();
  }
  loadAll() {
    this.loading = true;
    this.reviewService.query({
                page: this.page - 1,
                size: this.itemsPerPage,
                keyword: this.keyword,
                courseCode: this.courseCode,
                starNumber: this.starNumber
              }).subscribe(
                (res: HttpResponse<ReviewBO[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => {
                  console.log(res);
                  this.loading = false;
                }
            );
  }
  private onSuccess(data, headers) {
    this.totalItems = data.totalElements;
    this.reviews = data.content;
    this.loading = false;
  }
  loadPage(event: any) {
    this.page = event.page + 1;
    this.loadAll();
  }
}
