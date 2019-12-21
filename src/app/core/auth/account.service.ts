import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { SocketService } from './socket.service';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(private http: HttpClient, private socketService: SocketService) {}

  updateCurrentUser(body?: any) {
    return this.http.put<boolean>(SERVER_API_URL + 'api/user/update-current', body, { observe: 'response' });
  }

  registerInit(account?: any) {
    return this.http.post<boolean>(SERVER_API_URL + 'api/account/register', account, { observe: 'response' });
  }

  registerFinish(account?: any, activeKey?: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<boolean>(SERVER_API_URL + 'api/account/register/confirm?activeKey=' + activeKey, account, { observe: 'response' });
  }

  resetPasswordInit(email?: string) {
    return this.http.post<boolean>(SERVER_API_URL + 'api/account/reset-password/init?email=' + email, { observe: 'response' });
  }

  resetPasswordFinish(email?: string, newPassword?: string, key?: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<boolean>(SERVER_API_URL + 'api/account/reset-password/finish?email=' + email + '&newPassword=' + newPassword + '&key=' + key, { observe: 'response' });
  }

  changePassword(currentPassword?: string, newPassword?: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<boolean>(SERVER_API_URL + 'api/account/change-password?currentPassword=' + currentPassword + '&newPassword=' + newPassword, { observe: 'response' });
  }

  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(SERVER_API_URL + 'api/account', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(SERVER_API_URL + 'api/account', account, { observe: 'response' });
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.roleBOs) {
      return false;
    }

    return authorities.some((authority: string) => this.userIdentity.roleBOs.includes(authority));
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      id => {
        return Promise.resolve(id.roleBOs && id.roleBOs.includes(authority));
      },
      () => {
        return Promise.resolve(false);
      }
    );
  }

  identity(force?: boolean): Promise<Account> {
    if (force) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.fetch()
      .toPromise()
      .then(response => {
        const account: Account = response.body;
        if (account) {
          this.userIdentity = account;
          this.authenticated = true;
          this.socketService.connect();
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch(err => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
  }

}
