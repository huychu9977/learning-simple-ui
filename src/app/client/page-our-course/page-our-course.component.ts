import { CourseBO } from './../../models/courseBO.model';
import { CourseService } from '../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'page-our-course',
  templateUrl: './page-our-course.component.html',
  styleUrls: ['./page-our-course.component.scss']
})
export class PageOurCourseComponent implements OnInit {
  page = 1;
  previousPage;
  itemsPerPage = 10;
  totalItems: any = 100;
  listCoursePopular?: any[] = [];

  courses?: any[];
  categoryCode?: string;
  subCategoryCode?: string;
  topicCode?: string;
  levelCode?: string;
  rate?: any = null;
  params?: any = {};
  keyword = '';
  categories: any[] = [];
  parents: any[];
  levels: any[];
  rates: any[] = [];
  data: any[] = [
    {name: 'Trang chủ', url: 'home', active: false},
    {name: 'Khóa học', url: 'courses', active: true}
  ];

  constructor(
    private location: Location,
    private pageReloadService: PageReloadService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private courseService?: CourseService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryCode = params.categoryCode;
      this.subCategoryCode = params.subCategoryCode;
      this.topicCode = params.topicCode;
      //
      // tslint:disable-next-line:no-shadowed-variable
      this.route.queryParams.subscribe(params => {
        this.page = params.page || 1;
        this.previousPage = params.page || 1;
        this.keyword = params.keyword || '';
        this.levelCode = params.level || null;
        this.rate = params.rate || null;
      });
      this.transition();
      this.loadAll();
    });
    this.loadCategories();
    this.loadLevels();
    this.loadRates();
    this.loadCoursePopular();
  }
  loadAll() {
    this.params.page -= 1;
    this.courseService
        .queryForEmpoyer(this.params)
        .subscribe(
            (res: HttpResponse<CourseBO[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
  }

  loadCoursePopular() {
    this.courseService.getListCoursePopularForEmployer({
      page: 0,
      size: 10
    }).subscribe(res => {
      this.listCoursePopular = res.content;
    }, err => { console.log(err.error.message); });
  }

  loadPage(event: any) {
    this.page = event.page + 1;
    if (this.page !== this.previousPage) {
      const route = this.transition();
      const url = this.router
          .createUrlTree([route.link], { queryParams: route.param, relativeTo: this.route})
          .toString();
      this.location.replaceState(url);
      this.loadAll();
      this.previousPage = this.page;
    }
  }
  loadLevels() {
    this.courseService.getLevelsPromise().then(res => {
      this.levels = res;
    });
  }
  loadRates() {
    for (let i = 0; i < 2; i += 0.5) {
      this.rates.push({
        star: Math.floor(3 + 1.5 - i),
        starO: (i === 0.5 || i === 1.5) ? 0 : 1,
        code: `${3 + 1.5 - i}`,
        name: `${3 + 1.5 - i} & up`
      });
    }
  }
  loadCategories() {
    this.categoryService.getCategoriesPromise().then(res => {
      this.categories = res;
      this.parents = this.categories.filter(c => {
        return !c.parentCode;
      });
    });
  }
  loadSubCategories() {
    return this.categories.filter(c => {
      return c.parentCode;
    });
  }
  loadSubCategoriesByParent(parentCode) {
    return this.categories.filter(c => {
      return parentCode ? c.parentCode && c.parentCode === parentCode : c.parentCode;
    });
  }
  loadTopics(categoryCode) {
    if (categoryCode) {
      let cat: any = {topics: []};
      cat = this.categories.find(c => {
        return  c.parentCode && c.code === categoryCode;
      });
      return cat ? cat.topics : [];
    } else {
      const topics = [];
      if (!this.categoryCode) {
        this.categories.forEach(c => {
          if (c.parentCode && c.topics) { topics.push(...c.topics); }
        });
      } else {
        this.categories.forEach(c => {
          if (c.parentCode && c.topics && c.parentCode === this.categoryCode) { topics.push(...c.topics); }
        });
      }
      return topics;
    }
  }
  filter(event, type) {
    if (type === 'category') {
      this.subCategoryCode = null;
      this.topicCode = null;
      this.categoryCode = (this.categoryCode === event.target.value) ? null : event.target.value;
    }
    if (type === 'subCategory') {
      this.topicCode = null;
      this.subCategoryCode = (this.subCategoryCode === event.target.value) ? null : event.target.value;
      this.categories.forEach(c => {
        if (c.code === this.subCategoryCode) { this.categoryCode = c.parentCode; }
      });
    }
    if (type === 'topic') {
      this.topicCode = (this.topicCode === event.target.value) ? null : event.target.value;
      this.categories.forEach(c => {
        if (c.parentCode) {
          c.topics.forEach(t => {
            if (t.code === this.topicCode) {
              this.subCategoryCode = c.code;
              this.categoryCode = c.parentCode;
            }
          });
        }
      });
    }
    const route = this.transition();
    this.router.navigate(
      [route.link],
      {queryParams: route.param}
    );
  }
  select() {
    const route = this.transition();
    const url = this.router
        .createUrlTree([route.link], { queryParams: route.param, relativeTo: this.route})
        .toString();
    this.location.replaceState(url);
    this.loadAll();
  }
  clear() {
    this.categoryCode = null;
    this.subCategoryCode = null;
    this.topicCode = null;
    this.levelCode = null;
    this.rate = null;
    const route = this.transition();
    this.router.navigate(
      [route.link],
      {queryParams: route.param}
    );
    this.pageReloadService.reload(this.router);
  }
  transition() {
    this.params = {};
    let link = '/courses';
    if (this.categoryCode) {
      link = link + '/' + this.categoryCode;
      this.params = {...{categoryCode: this.categoryCode}};
    }
    if (this.subCategoryCode) {
      link = link + '/' + this.subCategoryCode;
      this.params = {...this.params, ...{subCategoryCode: this.subCategoryCode}};
    }
    if (this.topicCode) {
      link = link + '/' + this.topicCode;
      this.params = {...this.params, ...{topicCode: this.topicCode}};
    }
    const param = {
      keyword: this.keyword,
      level: this.levelCode,
      rate: this.rate,
      page: this.page,
      size: this.itemsPerPage
    };
    if (this.keyword === '' || !this.keyword) { delete param.keyword; }
    if (!this.levelCode) { delete param.level; }
    if (!this.rate) { delete param.rate; }
    this.params = {...this.params, ...param};
    if (this.page === 1) { delete param.page; }
    delete param.size;
    return {link, param};
  }

  private onSuccess(data) {
    this.totalItems = data.totalElements;
    this.courses = data.content;
  }

  private onError(error) {
      console.log(error);
  }
  togglePanelFilter() {
    const panel = document.getElementById('panelFilter');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
    setTimeout( () => {
      const f = document.getElementsByClassName('isFilter');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < f.length; i++) {
        f[i].classList.toggle('d-none');
      }
    }, 100);
  }
}
