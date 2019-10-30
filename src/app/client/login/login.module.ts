import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FindLanguageFromKeyPipe } from 'src/app/shared/language/find-language-from-key.pipe';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  entryComponents: [LoginModalComponent],
  exports: [LoginModalComponent]
})
export class LoginModalModule { }
