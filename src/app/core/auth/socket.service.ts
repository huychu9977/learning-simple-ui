// import { Observer, Observable } from 'rxjs';
// import { SERVER_API_URL } from './../../app.constants';
// import { Injectable } from '@angular/core';
// import { AuthServerProvider } from '../auth/auth-jwt.service';
// import { Location } from '@angular/common';
// import * as SockJS from 'sockjs-client';
// import * as Stomp from 'webstomp-client';
// import { Router, NavigationEnd } from '@angular/router';
// import { CSRFService } from './csrf.service';

// @Injectable({ providedIn: 'root' })
// export class SocketService {
//   stompClient = null;
//   connection: Promise<any>;
//   connectedPromise: any;
//   listener: Observable<any>;
//   listenerObserver: Observer<any>;
//   alreadyConnectedOnce = false;
//   constructor(
//     private router: Router,
//     private authServerProvider: AuthServerProvider,
//     private location: Location,
//     private csrfService: CSRFService
//   ) {
//     this.connection = this.createConnection();
//     this.listener = this.createListener();
//   }

//   connect() {
//     if (this.connectedPromise === null) {
//       this.connection = this.createConnection();
//     }
//     let url = SERVER_API_URL + 'ws';
//     const authToken = this.authServerProvider.getToken();
//     if (authToken) {
//       url += '?access_token=' + authToken;
//     }
//     const socket = new SockJS(url);
//     this.stompClient = Stomp.over(socket);
//     const headers = {};
//     this.stompClient.connect(headers, () => {
//       this.connectedPromise('success');
//       this.connectedPromise = null;
//       this.sendMessage('', 'ALL');
//       if (!this.alreadyConnectedOnce) {
//         this.router.events.subscribe(event => {
//           if (event instanceof NavigationEnd) {
//             this.sendMessage('', 'ALL');
//           }
//         });
//         this.alreadyConnectedOnce = true;
//       }
//     });
//   }

//   disconnect() {
//     if (this.stompClient !== null) {
//       this.stompClient.disconnect();
//       this.stompClient = null;
//     }
//   }

//   sendMessage(message, to) {
//     if (this.stompClient !== null && this.stompClient.connected) {
//       const destination = to === 'ALL' ? '/app/chat.message' : `/app/chat.private.${to}`;
//       this.stompClient.send(destination, // destination
//         JSON.stringify({  message }), // body
//         {} // header
//       );
//     }
//   }

//   receive() {
//     return this.listener;
//   }

//   listUserOnline(callback) {
//     this.connection.then(() => {
//       if (!this.stompClient) {
//         callback(null);
//         return;
//       }
//       this.stompClient.subscribe('/app/chat.participants', data => {
//         callback(JSON.parse(data.body));
//       });
//     });
//   }

//   userLogut(callback) {
//     this.connection.then(() => {
//       if (!this.stompClient) {
//         callback(null);
//         return;
//       }
//       this.stompClient.subscribe('/topic/chat.logout', data => {
//         callback(JSON.parse(data.body));
//       });
//     });
//   }

//   userLogin(callback) {
//     this.connection.then(() => {
//       if (!this.stompClient) {
//         callback(null);
//         return;
//       }
//       this.stompClient.subscribe('/topic/chat.login', data => {
//         callback(JSON.parse(data.body));
//       });
//     });
//   }

//   receiveMessage() {
//     if (this.stompClient !== null && this.stompClient.connected) {
//       this.stompClient.subscribe('/user/exchange/amq.direct/chat.message' , data => {
//         this.listenerObserver.next(JSON.parse(data.body));
//       });
//     }
//   }

//   private createListener(): Observable<any> {
//     return new Observable(observer => {
//       this.listenerObserver = observer;
//     });
//   }

//   private createConnection(): Promise<any> {
//     return new Promise((resolve, reject) => (this.connectedPromise = resolve));
//   }
// }
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CSRFService } from '../auth/csrf.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable({ providedIn: 'root' })
export class SocketService {
  stompClient = null;
  connection: Promise<any>;
  connectedPromise: any;

  constructor(
    private router: Router,
    private authServerProvider: AuthServerProvider,
    private location: Location,
    private csrfService: CSRFService
  ) {
    this.connection = this.createConnection();
  }

  connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    let url = SERVER_API_URL + 'ws';
    const authToken = this.authServerProvider.getToken();
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers = {};
    this.stompClient.connect(headers, () => {
      this.connectedPromise('success');
      this.connectedPromise = null;
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
  }

  listUserOnline(callback) {
    this.connection.then(() => {
      if (!this.stompClient) {
        callback(null);
        return;
      }
      this.stompClient.subscribe('/app/chat.participants', data => {
        callback(JSON.parse(data.body));
      });
    });
  }

  userLogut(callback) {
    this.connection.then(() => {
      if (!this.stompClient) {
        callback(null);
        return;
      }
      this.stompClient.subscribe('/topic/chat.logout', data => {
        callback(JSON.parse(data.body));
      });
    });
  }

  userLogin(callback) {
    this.connection.then(() => {
      if (!this.stompClient) {
        callback(null);
        return;
      }
      this.stompClient.subscribe('/topic/chat.login', data => {
        callback(JSON.parse(data.body));
      });
    });
  }

  receiveMessage(callback) {
    this.connection.then(() => {
      if (!this.stompClient) {
        callback(null);
        return;
      }
      this.stompClient.subscribe('/user/exchange/amq.direct/chat.message', data => {
        callback(JSON.parse(data.body));
      });
    });
  }

  sendMessage(message, to) {
    if (this.stompClient !== null && this.stompClient.connected) {
      const destination = to === 'ALL' ? '/app/chat.message' : `/app/chat.private.${to}`;
      this.stompClient.send(destination, // destination
        JSON.stringify({  message }), // body
        {} // header
      );
    }
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }
}
