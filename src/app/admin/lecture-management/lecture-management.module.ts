import { QuizComponent } from './quiz/quiz.component';
import { ListLectureComponent } from './list-lecture/list-lecture.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { LectureManagementComponent } from './lecture-management.component';
import { LectureManagementUpdateComponent } from './lecture-management-update.component';
import { LectureManagementDetailComponent } from './lecture-management-detail.component';
import { QuestionModalComponent } from './quiz/question-modal.component';
import { PaginationModule } from 'ngx-bootstrap';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';


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
    TranslateModule,
    RouterModule,
    CKEditorModule,
    NgSelectModule,
    PaginationModule.forRoot()
  ],
  providers: [SlugifyPipe],
  entryComponents: [ListLectureComponent, QuestionModalComponent],
  exports: [LectureManagementComponent]
})
export class LectureManagementModule { }
