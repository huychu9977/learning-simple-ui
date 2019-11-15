import { Injectable } from '@angular/core';
import { LoginModalComponent } from 'src/app/client/login/login.component';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  constructor() {}

  open() {
    // const modalRef = this.modalService.show(LoginModalComponent, {ignoreBackdropClick: true, keyboard: false});
    // return modalRef;
  }
}
