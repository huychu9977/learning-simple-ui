import { UserHeaderModule } from './../../core/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { PageLectureComponent } from './page-lecture.component';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { RatingModule, BsModalRef, ModalModule, ProgressbarModule, TabsModule, PaginationModule, AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [PageLectureComponent],
  imports: [
    RouterModule,
    UserHeaderModule,
    SharedLibsModule,
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    CKEditorModule
  ],
  providers: [BsModalRef],
  exports: [PageLectureComponent]
})
export class PageLectureModule { }
