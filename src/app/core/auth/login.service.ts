import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { AuthServerProvider } from './auth-jwt.service';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private accountService: AccountService, private socketService: SocketService,
        private authServerProvider: AuthServerProvider) {}

    login(credentials, callback?) {
        // tslint:disable-next-line:only-arrow-functions
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.accountService.identity(true).then(account => {
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
        this.socketService.disconnect();
    }
}
