import { NgModule } from '@angular/core';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { SharedLibsModule } from './shared-libs.module';
import { HasAnyAuthorityDirective } from './util/has-any-authority.directive';

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
