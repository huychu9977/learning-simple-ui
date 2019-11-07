import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HighlightSearch } from './util/highlight-text.pipe';
import { AvatarTextPipe } from './util/avatar-text.pipe';
import { ElLoadingDirective } from './util/el-loading.directive';

@NgModule({
  declarations: [HighlightSearch, AvatarTextPipe, ElLoadingDirective],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    HighlightSearch,
    AvatarTextPipe,
    ElLoadingDirective
  ]
})
export class SharedLibsModule {}
