import { P404Component } from './page-error/404.component';
import { AdminComponent } from './admin.component';
import { Routes, CanActivate, Router} from '@angular/router';

import { roleMgmtState } from './role-management/role-management-routing.module';
import { permissionMgmtState } from './permission-management/permission-management-routing.module';
import { userMgmtState } from './user-management/user-management-routing.module';
import { courseMgmtState } from './course-management/course-management-routing.module';
import { lectureMgmtState } from './lecture-management/lecture-management-routing.module';
import { LoginComponent } from './login/login.component';
import { Injectable } from '@angular/core';
import { AccountService } from '../core/auth/account.service';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NOT_USER } from '../shared/constants/roles.constants';

@Injectable({ providedIn: 'root' })
export class LoginRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}
  canActivate(): boolean | Promise<boolean> {
    return this.accountService.identity().then(account => {
      if (account) {
        this.router.navigate(['admin']);
        return false;
      }
      return true;
    });
  }
}
export const adminState: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data : {
        pageTitle: 'login.title'
    }
  },
  {
    path: '',
    component: AdminComponent,
    data: {
      authorities: NOT_USER
    },
    canActivate: [UserRouteAccessService],
    children: [
      ...roleMgmtState,
      ...permissionMgmtState,
      ...userMgmtState,
      ...courseMgmtState,
      ...lectureMgmtState,
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
          path: 'dashboard',
          component: DashboardComponent,
          data : {
              pageTitle: 'userManagement.home.title'
          }
      }
    ]
  },
  {
    path: 'accessdenied',
    component: P404Component,
    data: {
      authorities: [],
      pageTitle: 'error.title',
      error403: true
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      authorities: [],
      pageTitle: 'error.title',
      error404: true
    }
  },
  { path: '**', redirectTo: '404' }
];
