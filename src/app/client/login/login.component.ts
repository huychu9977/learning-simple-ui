import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/auth/login.service';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'login-modal',
  templateUrl: './login.component.html'
})
export class LoginModalComponent implements AfterViewInit {
  authenticationError: boolean;
  isLoginForm = true;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });

  constructor(
    private loginService: LoginService,
    private page: PageReloadService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    private fb: FormBuilder,
    private modalRef: BsModalRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.modalRef.hide();
  }
  requestResetPassword() {}
  login() {
    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .then(() => {
        this.authenticationError = false;
        this.modalRef.hide();
        this.page.reload(this.router);
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
