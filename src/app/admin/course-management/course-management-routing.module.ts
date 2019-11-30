import { RequirementComponent } from './requirement/requirement.component';
import { ObjectiveSummaryComponent } from './objective-summary/objective-summary.component';
import { Routes, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { CourseManagementComponent } from './course-management.component';
import { CourseManagementUpdateComponent } from './course-management-update.component';
import { CourseManagementDetailComponent } from './course-management-detail.component';
import { CourseService } from 'src/app/services/course.service';
import { CourseBO } from 'src/app/models/courseBO.model';


@Injectable({ providedIn: 'root' })
export class CourseMgmtResolve implements Resolve<any> {
  constructor(private service: CourseService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.params.code ? route.params.code : null;
    if (code) {
      return this.service.find(code);
    }
    const courseBO = new CourseBO();
    courseBO.id = null;
    return courseBO;
  }
}
export const courseMgmtState: Routes = [
    {
        path: 'course-management',
        component: CourseManagementComponent,
        data: {
            pageTitle: 'courseManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'course-management/new',
        component: CourseManagementUpdateComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'courseManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'course-management/edit/:code',
        component: CourseManagementUpdateComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'courseManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'course-management/:code/objectives',
        component: ObjectiveSummaryComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'courseManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'course-management/:code/requireds',
        component: RequirementComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'courseManagement.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'course-management/:code/view',
        component: CourseManagementDetailComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'courseManagement.home.title',
            defaultSort: 'id,asc'
        }
    }
];
