import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { UserService } from 'src/app/services/user.service';
import { UserBO } from 'src/app/models/userBO.model';


@Injectable({ providedIn: 'root' })
export class UserMgmtResolve implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id);
    }
    const userBO = new UserBO();
    userBO.id = null;
    return userBO;
  }
}
export const userMgmtState: Routes = [
    {
        path: 'user-management',
        component: UserManagementComponent,
        data: {
            pageTitle: 'userManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'user-management/:id/view',
        component: UserMgmtDetailComponent,
        resolve: {
          user: UserMgmtResolve
        },
        data: {
            pageTitle: 'userManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'user-management/new',
        component: UserMgmtUpdateComponent,
        resolve: {
          user: UserMgmtResolve
        },
        data: {
            pageTitle: 'userManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'user-management/:id/edit',
        component: UserMgmtUpdateComponent,
        resolve: {
          user: UserMgmtResolve
        },
        data: {
            pageTitle: 'userManagement.home.title',
            defaultSort: 'id,asc'
        }
    }
];
