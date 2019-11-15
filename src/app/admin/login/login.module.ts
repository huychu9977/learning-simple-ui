import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedLibsModule
  ]
})
export class LoginModule { }
