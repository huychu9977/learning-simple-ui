import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRouteSnapshot, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { JhiLanguageHelper } from './core/language/language.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'learning-simple-ui';
  load = false;
  constructor(
    private jhiLanguageHelper: JhiLanguageHelper,
    private translate: TranslateService,
    private router: Router) {
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
  }
  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data.pageTitle ? routeSnapshot.data.pageTitle : 'learningSimpleApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.load = true;
          break;
        }
        case event instanceof NavigationEnd:
            case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                  this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    this.load = false;
                  }, 500);
                  // if (event.error.status === 404) {
                  //   this.router.navigate(['/404']);
                  // }
                  break;
                }
        default : {
          break;
        }
      }
    });
  }
}
