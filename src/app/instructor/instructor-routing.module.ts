import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { CoursesComponent } from './courses/courses.component';
import { BecomeInstructorComponent } from './become-instructor/become-instructor.component';
import { CourseMgmtResolve } from '../admin/course-management/course-management-routing.module';
import { LectureMgmtResolve } from '../admin/lecture-management/lecture-management-routing.module';
import { PageProfileComponent } from '../client/page-profile/page-profile.component';

const instructorRoute: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      { path: '', redirectTo: 'become-instructor', pathMatch: 'full'},
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
            currentPage: 'courses',
            pageTitle: 'courseManagement.home.title'
        }
      },
      {
        path: 'courses/create',
        resolve: {
          course: CourseMgmtResolve
        },
        component: CoursesComponent,
        data: {
            currentPage: 'courses_update',
            pageTitle: 'courseManagement.home.createOrEditLabel'
        }
      },
      {
        path: 'courses/edit/:code',
        resolve: {
          course: CourseMgmtResolve
        },
        component: CoursesComponent,
        data: {
            currentPage: 'courses_update',
            pageTitle: 'courseManagement.home.createOrEditLabel'
        }
      },
      {
        path: 'courses/:code/lectures',
        component: CoursesComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            currentPage: 'lectures',
            pageTitle: 'lectureManagement.home.chapter.title'
        }
      },
      {
        path: 'courses/:code/lectures/create',
        component: CoursesComponent,
        resolve: {
            lecture: LectureMgmtResolve,
            course: CourseMgmtResolve
        },
        data: {
            currentPage: 'lectures_update',
            pageTitle: 'lectureManagement.home.chapter.createOrEditLabel'
        }
      },
      {
        path: 'courses/:code/lectures/:codeLecture/edit',
        component: CoursesComponent,
        resolve: {
            lecture: LectureMgmtResolve,
            course: CourseMgmtResolve
        },
        data: {
            currentPage: 'lectures_update',
            pageTitle: 'lectureManagement.home.chapter.createOrEditLabel'
        }
      },
      {
          path: 'courses/:code/lectures/:codeLecture/quiz',
          component: CoursesComponent,
          resolve: {
            lecture: LectureMgmtResolve
          },
          data: {
            currentPage: 'lectures_quiz',
            pageTitle: 'lectureManagement.detail.quiz'
          }
      },
      {
        path: 'courses/:code/lectures/:codeLecture/exercise',
        component: CoursesComponent,
        resolve: {
          lecture: LectureMgmtResolve
        },
        data: {
          currentPage: 'lectures_exercise',
          pageTitle: 'lectureManagement.detail.exercise'
        }
    },
      {
        path: 'courses/:code/objectives',
        component: CoursesComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            currentPage: 'objectives',
            pageTitle: 'courseManagement.objective.title'
        }
      },
      {
        path: 'courses/:code/requireds',
        component: CoursesComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            currentPage: 'requireds',
            pageTitle: 'courseManagement.required.title'
        }
      },
      {
        path: 'account',
        component: PageProfileComponent,
        data: {
          pageTitle: 'global.profile.title'
        }
    },
      {
        path: 'become-instructor',
        component: BecomeInstructorComponent
      },
      {
        path: 'become-instructor/step/:id',
        component: BecomeInstructorComponent
      }
    ]
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(instructorRoute)
    ],
    exports: [RouterModule]
  })
  export class InstructorRoutingModule { }
