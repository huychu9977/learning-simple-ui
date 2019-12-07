import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: any[];
  parents: any[];
  keyword: any = '';
  items = [];
  results = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategory();
    this.route.queryParams.subscribe(params => {
      this.keyword = params.keyword || '';
    });
  }
  suggestSearch(event) {
    this.courseService.queryCourseSuggest(event.query).subscribe(res => {
      this.results = [event.query, ...res];
    });
  }
  goToLink(code) {
    if (code) {
      this.router.navigate(['/course', code]);
    } else {
      this.router.navigate(['/courses'], {
        queryParams: {keyword: this.keyword}
      });
    }
  }
  search() {
    if (this.keyword !== '') {
      if (!this.keyword.hasOwnProperty('code')) {
        this.router.navigate(['/courses'], {
          queryParams: {keyword: this.keyword}
        });
      } else {
        this.router.navigate(['/course', this.keyword.code]);
      }
    } else {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url.split('?')[0]]);
    }
  }
  async loadCategory() {
    this.categories = await this.categoryService.getCategoriesPromise();
    this.parents = this.categories.filter(c => {
      return !c.parentCode;
    });
    this.items = this.parents.map(parent => {
        const subs = this.loadSubs(parent.code).map(sub => {
          const topics = this.loadTopics(sub.code).map(topic => {
            return {
              label: topic.name,
              routerLink: [`/courses/${parent.code}/${sub.code}/${topic.code}`]
            };
          });
          return topics.length > 0 ? { label: sub.name, items: topics, routerLink: [`/courses/${parent.code}/${sub.code}`] }
           : { label: sub.name, routerLink: [`/courses/${parent.code}/${sub.code}`] };
        });
        return subs.length > 0 ? { label: parent.name, items: subs, routerLink: [`/courses/${parent.code}`] }
               : { label: parent.name, routerLink: [`/courses/${parent.code}`] };
    });
  }
  loadSubs(parentCode) {
    return this.categories.filter(c => {
      return c.parentCode && c.parentCode === parentCode;
    });
  }
  loadTopics(categoryCode) {
    const cat = this.categories.find(c => {
      return c.parentCode && c.code === categoryCode;
    });
    return cat.topics;
  }
}
