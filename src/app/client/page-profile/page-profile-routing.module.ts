import { PageProfileComponent } from './page-profile.component';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const profileRoute: Routes = [
  {
    path: 'account',
    component: PageProfileComponent,
    children: [
      { path: '', redirectTo: 'edit-profile', pathMatch: 'full'},
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: {
          pageTitle: 'global.profile.title'
        },
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoute)
  ],
  exports: [RouterModule]
})
export class PageProfileRoutingModule { }
