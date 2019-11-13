import { JhiLanguageHelper } from './../core/language/language.helper';
import { navItems } from './_nav';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SessionStorageService } from 'ngx-webstorage';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginService } from '../core/auth/login.service';
import { AccountService } from '../core/auth/account.service';

@Component({
    selector: 'page-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  languages: any[];
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public route;
  public isCollapsed = true;
  constructor(
    private languageHelper: JhiLanguageHelper,
    private sessionStorage: SessionStorageService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private principal: AccountService,
    private router: Router,
    ) {
      this.route = this.router;
      translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translateMenu();
      });
  }
  ngOnInit(): void {
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
    this.translateMenu();
  }
  changeLanguage(languageKey: string) {
    this.sessionStorage.store('locale', languageKey);
    // this.languageService.changeLanguage(languageKey);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['admin/login']);
  }
  translateMenu() {
    // translate menu
    if (localStorage.getItem('menu') === null) {
        this.navItems.forEach(nav => {
          if (nav.hasOwnProperty('key')) {
            this.translateIntoVN(nav);
          }
        });
        localStorage.setItem('menu', JSON.stringify(this.navItems));
    } else {
        this.navItems = JSON.parse(localStorage.getItem('menu'));
    }
    const principal = this.principal;
    this.principal.identity().then(account => {
        this.navItems = (this.navItems || []).filter(menu => {
          if (menu.hasOwnProperty('authorities')) {
            const authorities = menu.authorities;
            if (!authorities || authorities.length === 0) {
                return true;
            }
            if (account) {
                return principal.hasAnyAuthority(authorities);
            }
          }
          return true;
        });
    });
  }
  translateIntoVN(item: any) {
    item.name = this.translateService.instant(item.key);
    if (item.children !== undefined && item.children.length > 0) {
        item.children.forEach(child => {
            this.translateIntoVN(child);
        });
    }
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
