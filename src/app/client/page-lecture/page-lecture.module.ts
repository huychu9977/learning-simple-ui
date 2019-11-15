import { UserHeaderModule } from './../../core/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { PageLectureComponent } from './page-lecture.component';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [PageLectureComponent],
  imports: [
    RouterModule,
    UserHeaderModule,
    SharedLibsModule
  ],
  exports: [PageLectureComponent]
})
export class PageLectureModule { }
