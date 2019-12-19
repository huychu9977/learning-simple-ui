import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/auth/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  authenticationError: boolean;
  submitted = false;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .then(() => {
        this.authenticationError = false;
        this.router.navigateByUrl('admin');
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

}
