import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ALL_ROLE } from '../shared/constants/roles.constants';
import { UserRouteAccessProfileService } from '../core/auth/user-route-access-profile-service';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageOurCourseComponent } from './page-our-course/page-our-course.component';
import { PageMyCourseComponent } from './page-my-course/page-my-course.component';
import { PageCourseComponent } from './page-course/page-course.component';
import { PageOurTeacherComponent } from './page-our-teacher/page-our-teacher.component';
import { PageTeacherComponent } from './page-teacher/page-teacher.component';
import { PageLectureComponent } from './page-lecture/page-lecture.component';
import { UserRouteAccessCourseService } from '../core/auth/user-route-access-course-service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageEventComponent } from './page-event/page-event.component';

const clientRoute: Routes = [
    {
      path: '',
      component: ClientComponent,
      children: [
        {
          path: 'user',
          loadChildren: () => import('./page-profile/page-profile.module').then(m => m.PageProfileModule),
          data: {
            authorities: ALL_ROLE
          },
          canActivate: [UserRouteAccessProfileService],
        },
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        {
            path: 'home',
            component: PageHomeComponent,
            data: {
                pageTitle: 'global.menu.home'
            }
        },
        {
            path: 'events/:code',
            component: PageEventComponent,
            data: {
              pageTitle: 'eventManagement.home.title'
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
    imports: [
      RouterModule.forChild(clientRoute)
    ],
    exports: [RouterModule]
  })
  export class ClientRoutingModule { }
