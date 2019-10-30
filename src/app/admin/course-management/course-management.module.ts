import { RequirementComponent } from './requirement/requirement.component';
import { ObjectiveSummaryComponent } from './objective-summary/objective-summary.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseManagementUpdateComponent } from './course-management-update.component';
import { CourseManagementDetailComponent } from './course-management-detail.component';
import { CourseManagementComponent } from './course-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [CourseManagementUpdateComponent, CourseManagementDetailComponent,
    CourseManagementComponent, ObjectiveSummaryComponent, RequirementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    CKEditorModule,
    NgSelectModule,
    PaginationModule.forRoot()
  ],
  exports: [CourseManagementComponent]
})
export class CourseManagementModule { }
