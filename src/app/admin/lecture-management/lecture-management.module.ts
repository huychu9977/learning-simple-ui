import { QuizComponent } from './quiz/quiz.component';
import { ListLectureComponent } from './list-lecture/list-lecture.component';
import { NgModule } from '@angular/core';
import { LectureManagementComponent } from './lecture-management.component';
import { LectureManagementUpdateComponent } from './lecture-management-update.component';
import { LectureManagementDetailComponent } from './lecture-management-detail.component';
import { QuestionModalComponent } from './quiz/question-modal.component';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';
import { DialogService } from 'primeng/api';


@NgModule({
  declarations: [LectureManagementComponent,
    LectureManagementUpdateComponent,
    LectureManagementDetailComponent,
    ListLectureComponent,
    QuestionModalComponent,
    QuizComponent,
    SlugifyPipe],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ],
  providers: [SlugifyPipe, DialogService],
  entryComponents: [ListLectureComponent, QuestionModalComponent],
  exports: [LectureManagementComponent]
})
export class LectureManagementModule { }
