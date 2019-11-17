import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ToastModule
  ],
  providers: [MessageService],
  entryComponents: [LoginModalComponent],
  exports: [LoginModalComponent]
})
export class LoginModalModule { }
