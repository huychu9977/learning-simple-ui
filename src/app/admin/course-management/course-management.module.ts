import { RequirementComponent } from './requirement/requirement.component';
import { ObjectiveSummaryComponent } from './objective-summary/objective-summary.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgModule } from '@angular/core';
import { CourseManagementUpdateComponent } from './course-management-update.component';
import { CourseManagementDetailComponent } from './course-management-detail.component';
import { CourseManagementComponent } from './course-management.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';



@NgModule({
  declarations: [CourseManagementUpdateComponent, CourseManagementDetailComponent,
    CourseManagementComponent, ObjectiveSummaryComponent, RequirementComponent],
  imports: [
    SharedLibsModule,
    TranslateModule,
    RouterModule,
    CKEditorModule,
    NgSelectModule,
    PaginationModule.forRoot()
  ],
  exports: [CourseManagementComponent]
})
export class CourseManagementModule { }
