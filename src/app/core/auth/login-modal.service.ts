import { Injectable } from '@angular/core';
import { LoginModalComponent } from 'src/app/client/login/login.component';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  constructor(public dialogService: DialogService) {}

  open() {
    this.dialogService.open(LoginModalComponent, {
      showHeader: false,
      closeOnEscape: false,
      width: '30%'
    });
  }
}
