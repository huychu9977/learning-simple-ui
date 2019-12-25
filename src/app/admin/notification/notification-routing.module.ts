import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access-service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationUpdateComponent } from './notification-update.component';
import { NotificationComponent } from './notification.component';


@Injectable({ providedIn: 'root' })
export class NotificationMgmtResolve implements Resolve<any> {
  constructor(private service: NotificationService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id);
    }
    const noti: any = {};
    noti.id = null;
    return noti;
  }
}
export const notificationMgmtState: Routes = [
    {
        path: 'notification-management',
        component: NotificationComponent,
        data: {
            pageTitle: 'notificationManagement.home.title',
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-management/new',
        component: NotificationUpdateComponent,
        resolve: {
            notification: NotificationMgmtResolve
        },
        data: {
            pageTitle: 'notificationManagement.update.title',
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-management/:id/edit',
        component: NotificationUpdateComponent,
        resolve: {
            notification: NotificationMgmtResolve
        },
        data: {
            pageTitle: 'notificationManagement.update.title',
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService]
    }
];
