import { PageTeacherComponent } from './page-teacher/page-teacher.component';
import { PageOurTeacherComponent } from './page-our-teacher/page-our-teacher.component';
import { PageOurCourseComponent } from './page-our-course/page-our-course.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from './page-footer/footer.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';
import { PageCourseModule } from './page-course/page-course.module';
import { PageCourseComponent } from './page-course/page-course.component';
import { ClientComponent } from './client.component';
import { PageHomeModule } from './page-home/page-home.module';
import { PageOurCourseModule } from './page-our-course/page-our-course.module';
import { PageLectureModule } from './page-lecture/page-lecture.module';
import { PageOurTeacherModule } from './page-our-teacher/page-our-teacher.module';
import { PageTeacherModule } from './page-teacher/page-teacher.module';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageLectureComponent } from './page-lecture/page-lecture.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from './page-header/header.module';
import { LoginModalModule } from './login/login.module';
import { UserRouteAccessCourseService } from '../core/auth/user-route-access-course-service';
import { PageMyCourseComponent } from './page-my-course/page-my-course.component';
import { PageMyCourseModule } from './page-my-course/page-my-course.module';
const clientRoute: Routes = [
    {
      path: '',
      component: ClientComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        {
            path: 'home',
            component: PageHomeComponent,
            data: {
                pageTitle: 'global.menu.home'
            }
        },
        {
          path: 'courses',
          component: PageOurCourseComponent,
          data: {
            pageTitle: 'courseManagement.home.title'
          }
        },
        {
          path: 'courses/:categoryCode',
          component: PageOurCourseComponent,
          data: {
            pageTitle: 'courseManagement.home.title'
          }
        },
        {
          path: 'courses/:categoryCode/:subCategoryCode',
          component: PageOurCourseComponent,
          data: {
            pageTitle: 'courseManagement.home.title'
          }
        },
        {
          path: 'courses/:categoryCode/:subCategoryCode/:topicCode',
          component: PageOurCourseComponent,
          data: {
            pageTitle: 'courseManagement.home.title'
          }
        },
        {
          path: 'account/my-courses',
          component: PageMyCourseComponent,
          data: {
            pageTitle: 'courseManagement.home.title'
          }
        },
        {
          path: 'course/:course-code',
          component: PageCourseComponent
        },
        {
          path: 'our-teacher',
          component: PageOurTeacherComponent
        },
        {
          path: 'teacher',
          component: PageTeacherComponent
        },
        {
          path: 'course/:course-code/lecture/:code',
          component: PageLectureComponent,
          canActivate: [UserRouteAccessCourseService]
        },
        { path: 'not-found', component: PageNotFoundComponent},
        { path: '**', redirectTo: 'not-found' }
      ]
    }
  ];
@NgModule({
    declarations: [ClientComponent
      , FooterComponent, PageNotFoundComponent],
    imports: [
      CommonModule,
      CarouselModule,
      TranslateModule,
      RouterModule.forChild(clientRoute),
      LoginModalModule,
      HeaderModule,
      PageHomeModule,
      PageOurCourseModule,
      PageCourseModule,
      PageLectureModule,
      PageOurTeacherModule,
      PageTeacherModule,
      PageMyCourseModule
    ]
  })
  export class ClientModule { }
