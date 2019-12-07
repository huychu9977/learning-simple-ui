import { LoadingScreenComponent } from './../layouts/loading-screen/loading-screen.component';
import { UserManagementModule } from './user-management/user-management.module';
import { P404Component } from './page-error/404.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { adminState } from './admin.route';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { RoleManagementModule } from './role-management/role-management.module';
import { PermissionManagementModule } from './permission-management/permission-management.module';
import { CourseManagementModule } from './course-management/course-management.module';
import { LectureManagementModule } from './lecture-management/lecture-management.module';
import { LoginModule } from './login/login.module';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { EventManagementModule } from './event-management/event-management.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(adminState),
    FormsModule,
    RouterModule,
    UserManagementModule,
    RoleManagementModule,
    PermissionManagementModule,
    CourseManagementModule,
    LectureManagementModule,
    LoginModule,
    DashboardModule,
    EventManagementModule
  ],
  declarations: [
    AdminComponent, P404Component, LoadingScreenComponent,
  ]
})
export class AdminModule {}
