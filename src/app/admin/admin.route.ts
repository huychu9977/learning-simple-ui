import { P404Component } from './page-error/404.component';
import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';

import { roleMgmtState } from './role-management/role-management-routing.module';
import { permissionMgmtState } from './permission-management/permission-management-routing.module';
import { userMgmtState } from './user-management/user-management-routing.module';
import { courseMgmtState } from './course-management/course-management-routing.module';
import { lectureMgmtState } from './lecture-management/lecture-management-routing.module';
import { LoginComponent } from './login/login.component';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NOT_USER } from '../shared/constants/roles.constants';
import { eventMgmtState } from './event-management/event-management-routing.module';
import { StatisticalComponent } from './statistical/statistical.component';
import { notificationMgmtState } from './notification/notification-routing.module';
import { categoryMgmtState } from './categories/categories-routing.module';

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
      ...eventMgmtState,
      ...notificationMgmtState,
      ...categoryMgmtState,
      { path: '', redirectTo: 'statistical', pathMatch: 'full'},
      {
        path: 'statistical',
        component: StatisticalComponent,
        data : {
            pageTitle: 'global.statistical.navName'
        }
      },
      {
          path: 'dashboard',
          component: DashboardComponent,
          data : {
              pageTitle: 'global.dashboard.navName',
              authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService]
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
