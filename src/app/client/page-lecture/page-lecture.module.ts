import { UserHeaderModule } from '../../shared/modules/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { PageLectureComponent } from './page-lecture.component';
import { NgModule } from '@angular/core';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import {TabViewModule} from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [PageLectureComponent],
  imports: [
    RouterModule,
    UserHeaderModule,
    SharedLibsModule,
    ProgressBarModule,
    DialogModule,
    RatingModule,
    TabViewModule,
    PaginatorModule,
    EditorModule,
    OverlayPanelModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  exports: [PageLectureComponent]
})
export class PageLectureModule { }
