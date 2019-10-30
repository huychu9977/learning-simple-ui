import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: any[];
  parents: any[];
  keyword: '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategory();
    this.route.queryParams.subscribe(params => {
      this.keyword = params.keyword || '';
    });
  }
  search() {
    if (this.keyword !== '') {
      this.router.navigate(['/courses'], {
        queryParams: {keyword: this.keyword}
      });
    }
  }
  loadCategory() {
    this.categoryService.getCategoriesForEmployer().subscribe(res => {
      this.categories = res;
      this.parents = this.categories.filter(c => {
        return !c.parentCode;
      });
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
