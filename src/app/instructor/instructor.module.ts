import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { BecomeInstructorModule } from './become-instructor/become-instructor.module';
import { BecomeInstructorComponent } from './become-instructor/become-instructor.component';
import { FooterModule } from '../client/page-footer/footer.module';
import { HeaderModule } from '../client/page-header/header.module';
import { CoursesComponent } from './courses/courses.component';
import { CoursesModule } from './courses/courses.module';
import { CourseService } from '../services/course.service';
import { CourseBO } from '../models/courseBO.model';

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
const instructorRoute: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      { path: '', redirectTo: 'become-instructor', pathMatch: 'full'},
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'courses/:action',
        resolve: {
          course: CourseMgmtResolve
        },
        component: CoursesComponent
      },
      {
        path: 'courses/:action/:code',
        resolve: {
          course: CourseMgmtResolve
        },
        component: CoursesComponent
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
  declarations: [InstructorComponent],
  imports: [
    CommonModule,
    BecomeInstructorModule,
    CoursesModule,
    FooterModule,
    HeaderModule,
    RouterModule.forChild(instructorRoute)
  ]
})
export class InstructorModule { }
