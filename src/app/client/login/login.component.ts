import { ToastrService } from 'ngx-toastr';
import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/auth/login.service';
import { PageReloadService } from 'src/app/core/auth/page-reload.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/core/auth/account.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login.component.html'
})
export class LoginModalComponent implements AfterViewInit {
  authenticationError: boolean;
  isLoginForm = true;
  isFormActiveKey = false;
  isForgotPasswordForm = false;
  isConfirmResetPassword = false;
  isActiveRegister = false;
  isActiveForgot = false;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]]
  });
  forgotPasswordConfirmForm = this.fb.group({
    newPassword: ['', [Validators.required]],
    key: ['', [Validators.required]]
  });
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    // tslint:disable-next-line:max-line-length
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required]]
  });
  activeKeyForm = this.fb.group({
    key: ['',  [Validators.required]]
  });
  load = false;
  message = '';
  messageRegister = '';
  userRegister: any;
  btnSend = 'Gửi';
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private page: PageReloadService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    private fb: FormBuilder,
    private modalRef: BsModalRef,
    private toastr?: ToastrService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  cancel() {
    this.authenticationError = false;
    this.resetAllForm();
    this.modalRef.hide();
  }
  resetAllForm() {
    this.isFormActiveKey = false;
    this.isLoginForm = true;
    this.isActiveRegister = false;
    this.isActiveForgot = false;
    this.isForgotPasswordForm = false;
    this.isConfirmResetPassword = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.registerForm.patchValue({
      username: '',
      name: '',
      email: '',
      password: ''
    });
    this.registerForm.patchValue({
      key: ''
    });
    this.forgotPasswordForm.patchValue({
      email: ''
    });
    this.forgotPasswordConfirmForm.patchValue({
      newPassword: '',
      key: ''
    });
  }
  requestResetPassword() {
    if (this.forgotPasswordForm.invalid) {
      this.messageRegister = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }
    this.messageRegister = '';
    this.load = true;
    this.accountService.resetPasswordInit(this.forgotPasswordForm.get(['email']).value).subscribe(
      res => {
        if (res) {
          this.load = false;
          this.toastr.success('Kiểm tra mail để nhận mã khôi phục', 'Thành công!');
          this.forgotPasswordForm.get(['email']).disable();
          this.isConfirmResetPassword = true;
          this.isActiveForgot = true;
        }
      }, err => {
        this.load = false;
        this.toastr.error(err.error.message);
      }
    );
  }
  confirmResetPassword() {
    if (this.forgotPasswordConfirmForm.invalid) {
      this.messageRegister = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }
    this.messageRegister = '';
    this.load = true;
    this.accountService.resetPasswordFinish(this.forgotPasswordForm.get(['email']).value,
    this.forgotPasswordConfirmForm.get(['newPassword']).value,
    this.forgotPasswordConfirmForm.get(['key']).value
    ).subscribe(
      res => {
        if (res) {
          this.load = false;
          this.toastr.success('Khôi phục mật khẩu thành công!', 'Thành công!');
          this.forgotPasswordForm.get(['email']).enable();
          this.isForgotPasswordForm = false;
          this.isConfirmResetPassword = false;
          this.isActiveForgot = false;
          this.isLoginForm = true;
          this.resetAllForm();
        }
      }, err => {
        this.load = false;
        this.toastr.error(err.error.message);
      }
    );
  }
  register() {
    if (this.registerForm.invalid) {
      this.messageRegister = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }
    this.load = true;
    this.messageRegister = '';
    const user = {
      username : this.registerForm.get(['username']).value,
      name : this.registerForm.get(['name']).value,
      email : this.registerForm.get(['email']).value,
      password : this.registerForm.get(['password']).value
    };
    this.userRegister = {...user};
    this.accountService.registerInit(this.userRegister).subscribe(res => {
      if (res) {
        this.load = false;
        this.toastr.success('Kiểm tra mail để nhận mã kích hoạt', 'Thành công!');
        this.setDisabledForm();
        this.isFormActiveKey = true;
      }
    }, err => {
      this.load = false;
      this.toastr.error(err.error.message);
    });
  }
  setDisabledForm() {
    this.registerForm.get(['username']).disable();
    this.registerForm.get(['name']).disable();
    this.registerForm.get(['email']).disable();
    this.registerForm.get(['password']).disable();
    this.isActiveRegister = true;
  }
  setEnabledForm() {
    this.registerForm.get(['username']).enable();
    this.registerForm.get(['name']).enable();
    this.registerForm.get(['email']).enable();
    this.registerForm.get(['password']).enable();
    this.isActiveRegister = false;
  }
  registerFinish() {
    if (this.activeKeyForm.invalid) {
      this.messageRegister = 'Vui lòng điền mã kích hoạt!';
      return;
    }
    this.messageRegister = '';
    this.load = true;
    this.accountService.registerFinish(this.userRegister, this.activeKeyForm.get(['key']).value).subscribe(res => {
      if (res) {
        this.load = false;
        this.toastr.success('Đăng ký tài khoản thành công!');
        this.setEnabledForm();
        this.isLoginForm = true;
        this.isFormActiveKey = false;
        this.resetAllForm();
      }
    }, err => {
      this.load = false;
      this.toastr.error(err.error.message);
    });
  }
  login() {
    if (this.loginForm.invalid) {
      this.message = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }
    this.message = '';
    this.load = true;
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
        this.load = false;
      });
  }
}
