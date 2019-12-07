import { QuizComponent } from './quiz/quiz.component';
import { Routes, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { CourseMgmtResolve } from '../course-management/course-management-routing.module';
import { LectureManagementComponent } from './lecture-management.component';
import { LectureManagementUpdateComponent } from './lecture-management-update.component';
import { LectureService } from 'src/app/services/lecture.service';
import { LectureBO } from 'src/app/models/lectureBO.model';


@Injectable({ providedIn: 'root' })
export class LectureMgmtResolve implements Resolve<any> {
  constructor(private service: LectureService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.params.codeLecture ? route.params.codeLecture : null;
    const courseCode = route.params.code ? route.params.code : null;
    if (code) {
      return this.service.find(courseCode, code);
    }
    const lecture = new LectureBO();
    lecture.id = null;
    return lecture;
  }
}
export const lectureMgmtState: Routes = [
    {
        path: 'course-management/:code/lectures',
        component: LectureManagementComponent,
        resolve: {
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'lectureManagement.home.chapter.title'
        }
    },
    {
        path: 'course-management/:code/lectures/create',
        component: LectureManagementUpdateComponent,
        resolve: {
            lecture: LectureMgmtResolve,
            course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'lectureManagement.home.chapter.createOrEditLabel'
        }
    },
    {
        path: 'course-management/:code/lectures/:codeLecture/edit',
        component: LectureManagementUpdateComponent,
        resolve: {
          lecture: LectureMgmtResolve,
          course: CourseMgmtResolve
        },
        data: {
            pageTitle: 'lectureManagement.home.chapter.createOrEditLabel'
        }
    },
    {
        path: 'course-management/:code/lectures/:codeLecture/quiz',
        component: QuizComponent,
        resolve: {
          lecture: LectureMgmtResolve
        },
        data: {
            pageTitle: 'lectureManagement.detail.quiz'
        }
    }
];
