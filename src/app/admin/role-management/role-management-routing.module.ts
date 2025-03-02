import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { RoleManagementComponent } from './role-management.component';
import { RoleMgmtUpdateComponent } from './role-management-update.component';
import { RoleService } from 'src/app/services/role.service';
import { RoleBO } from 'src/app/models/roleBO.model';
import { UserRouteAccessService } from 'src/app/core/auth/user-route-access-service';


@Injectable({ providedIn: 'root' })
export class RoleMgmtResolve implements Resolve<any> {
  constructor(private service: RoleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const code = route.params.code ? route.params.code : null;
    if (code) {
      return this.service.find(code);
    }
    const roleBO = new RoleBO();
    roleBO.id = null;
    return roleBO;
  }
}
export const roleMgmtState: Routes = [
    {
        path: 'role-management',
        component: RoleManagementComponent,
        data: {
            pageTitle: 'roleManagement.home.title',
            defaultSort: 'id,asc',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-management/new',
        component: RoleMgmtUpdateComponent,
        resolve: {
            role: RoleMgmtResolve
        },
        data: {
            pageTitle: 'roleManagement.home.title',
            defaultSort: 'id,asc',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-management/:code/edit',
        component: RoleMgmtUpdateComponent,
        resolve: {
        role: RoleMgmtResolve
        },
        data: {
            pageTitle: 'roleManagement.home.title',
            defaultSort: 'id,asc',
            authorities: ['ROLE_BOSS']
        },
        canActivate: [UserRouteAccessService]
    }
];
