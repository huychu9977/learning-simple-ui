import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access-service';
import { CategoryService } from 'src/app/services/category.service';
import { CategoriesComponent } from './categories.component';
import { CategoriesUpdateComponent } from './categories-update.component';


@Injectable({ providedIn: 'root' })
export class CategoryMgmtResolve implements Resolve<any> {
  constructor(private service: CategoryService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id);
    }
    const cate: any = {};
    cate.id = null;
    return cate;
  }
}
export const categoryMgmtState: Routes = [
    {
        path: 'category-management',
        component: CategoriesComponent,
        data: {
            pageTitle: 'categoryManagement.home.title',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-management/new',
        component: CategoriesUpdateComponent,
        resolve: {
            category: CategoryMgmtResolve
        },
        data: {
            pageTitle: 'categoryManagement.update.title',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-management/:id/edit',
        component: CategoriesUpdateComponent,
        resolve: {
            category: CategoryMgmtResolve
        },
        data: {
            pageTitle: 'categoryManagement.update.title',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    }
];
