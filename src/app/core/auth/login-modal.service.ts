import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from 'src/app/client/login/login.component';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  constructor(private modalService: BsModalService) {}

  open() {
    const modalRef = this.modalService.show(LoginModalComponent);
    return modalRef;
  }
}
