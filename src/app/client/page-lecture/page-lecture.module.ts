import { FormsModule } from '@angular/forms';
import { UserHeaderModule } from './../../core/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { PageLectureComponent } from './page-lecture.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RatingModule, BsModalRef, ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [PageLectureComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    UserHeaderModule,
    FormsModule,
    RatingModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [BsModalRef],
  exports: [PageLectureComponent]
})
export class PageLectureModule { }
