import { NgModule } from '@angular/core';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, HasAnyAuthorityDirective],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    HasAnyAuthorityDirective
  ]
})
export class SharedModule {}
