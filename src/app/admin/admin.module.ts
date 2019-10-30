import { LoadingScreenComponent } from './../layouts/loading-screen/loading-screen.component';
import { FindLanguageFromKeyPipe } from './../shared/language/find-language-from-key.pipe';
import { UserManagementModule } from './user-management/user-management.module';
import { P404Component } from './page-error/404.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { adminState } from './admin.route';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoleManagementModule } from './role-management/role-management.module';
import { PermissionManagementModule } from './permission-management/permission-management.module';
import { CourseManagementModule } from './course-management/course-management.module';
import { LectureManagementModule } from './lecture-management/lecture-management.module';
import { LoginModule } from './login/login.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(adminState),
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgSelectModule,
    CKEditorModule,
    UserManagementModule,
    RoleManagementModule,
    PermissionManagementModule,
    CourseManagementModule,
    LectureManagementModule,
    LoginModule
  ],
  declarations: [
    AdminComponent, P404Component, LoadingScreenComponent,
    PageDashboardComponent, FindLanguageFromKeyPipe,
  ]
})
export class AdminModule {}
