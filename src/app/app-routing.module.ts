import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
