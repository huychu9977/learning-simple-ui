import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HighlightSearch } from './util/highlight-text.pipe';
import { AvatarTextPipe } from './util/avatar-text.pipe';
import { ElLoadingDirective } from './util/el-loading.directive';
import { StatusText } from './util/status-text.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [HighlightSearch, AvatarTextPipe, ElLoadingDirective, StatusText, TimeAgoPipe],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    HighlightSearch,
    AvatarTextPipe,
    ElLoadingDirective,
    ToastModule,
    StatusText,
    TimeAgoPipe
  ]
})
export class SharedLibsModule {}
