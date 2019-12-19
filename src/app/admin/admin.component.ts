import { navItems } from './_nav';
import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginService } from '../core/auth/login.service';
import { AccountService } from '../core/auth/account.service';
import { SocketService } from '../core/auth/socket.service';

@Component({
    selector: 'page-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  navItems = navItems;
  route;
  listUser?: any[] = [];
  listMessage?: any[] = [];
  newMessage = false;
  constructor(
    private socketService: SocketService,
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
    this.translateMenu();
    this.socketService.receiveMessage(res => {
      this.newMessage = true;
      let check = false;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listUser.length; i++) {
        if (this.listUser[i].username === res.username) {
          this.listUser[i].notification = true;
          check = true;
          break;
        }
      }
      if (!check) {
        this.listUser.push({
          username: res.username,
          notification: true
        });
      }
    });
  }

  async getListMessage(user) {
    this.principal.identity().then(async account => {
      const mess = await this.socketService.getListMessage(user.username).toPromise();
      let isHasUser = false;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listMessage.length; i++) {
        if (this.listMessage[i].user === user.username) {
          this.listMessage[i].messages = [];
          this.listMessage[i].messages = mess.map(m => {
            return {
              content: m.content,
              createdAt: m.createdAt,
              isSent: m.senderId === account.id
            };
          });
          isHasUser = true;
        }
      }
      if (!isHasUser) {
        this.listMessage.push({
          username: user.username,
          name: user.username,
          messages : mess.length > 0 ? mess.map(m => {
            return {content: m.content, createdAt: m.createdAt, isSent: m.senderId === account.id};
          }) : []
        });
      }
      user.notification = false;
    });
  }

  onClose(event) {
    this.listMessage.splice(event - 1, 1);
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
}
