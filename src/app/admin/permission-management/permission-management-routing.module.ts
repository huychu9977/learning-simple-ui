import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { PermissionManagementComponent } from './permission-management.component';
import { PermissionMgmtUpdateComponent } from './permission-management-update.component';
import { PermissionService } from 'src/app/services/permission.service';
import { PermissionBO } from 'src/app/models/permissionBO.model';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access-service';


@Injectable({ providedIn: 'root' })
export class PermissionMgmtResolve implements Resolve<any> {
  constructor(private service: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id);
    }
    const permissionBO = new PermissionBO();
    permissionBO.id = null;
    return permissionBO;
  }
}
export const permissionMgmtState: Routes = [
    {
        path: 'permission-management',
        component: PermissionManagementComponent,
        data: {
            pageTitle: 'permissionManagement.home.title',
            defaultSort: 'id,asc',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permission-management/new',
        component: PermissionMgmtUpdateComponent,
        resolve: {
            permission: PermissionMgmtResolve
        },
        data: {
            pageTitle: 'permissionManagement.home.title',
            defaultSort: 'id,asc',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permission-management/:id/edit',
        component: PermissionMgmtUpdateComponent,
        resolve: {
            permission: PermissionMgmtResolve
        },
        data: {
            pageTitle: 'permissionManagement.home.title',
            defaultSort: 'id,asc',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    }
];
