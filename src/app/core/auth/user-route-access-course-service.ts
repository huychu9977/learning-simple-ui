import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { CourseRegistrationService } from 'src/app/services/course-registration.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessCourseService implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private courseRegistrationService: CourseRegistrationService,
    private stateStorageService: StateStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const authorities = route.data.authorities;
    return this.checkLogin(authorities, state.url, route.params['course-code']);
  }

  checkLogin(authorities: string[], url: string, courseCode: string): Promise<boolean> {
    return this.accountService.identity().then(account => {
      if (account) {
        return this.courseRegistrationService.findOne(courseCode).toPromise().then(courseRegistration => {
            if (courseRegistration) { return true; }
            this.goToLink(courseCode);
            return false;
        });
      }
      this.goToLink(courseCode);
      return false;
    });
  }
  goToLink(courseCode) {
      if (courseCode) { this.router.navigate(['course', courseCode]); } else { this.router.navigate(['courses']); }
  }
}
