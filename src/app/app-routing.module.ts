import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessProfileService } from './core/auth/user-route-access-profile-service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
        },
        {
          path: 'instructor',
          loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule),
          data: {
            authorities: ['ROLE_USER']
        },
          canActivate: [UserRouteAccessProfileService]
        },
        {
          path: '',
          loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
        },
      ]
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
