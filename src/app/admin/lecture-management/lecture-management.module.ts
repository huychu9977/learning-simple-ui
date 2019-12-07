import { QuizComponent } from './quiz/quiz.component';
import { ListLectureComponent } from './list-lecture/list-lecture.component';
import { NgModule } from '@angular/core';
import { LectureManagementComponent } from './lecture-management.component';
import { LectureManagementUpdateComponent } from './lecture-management-update.component';
import { QuestionModalComponent } from './quiz/question-modal.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';
import { DialogService } from 'primeng/api';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';


@NgModule({
  declarations: [LectureManagementComponent,
    LectureManagementUpdateComponent,
    ListLectureComponent,
    QuestionModalComponent,
    QuizComponent
    ],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ],
  providers: [SlugifyPipe, DialogService],
  entryComponents: [ListLectureComponent, QuestionModalComponent],
  exports: [LectureManagementComponent, LectureManagementUpdateComponent, QuizComponent]
})
export class LectureManagementModule { }
