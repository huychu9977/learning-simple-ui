import { RequirementComponent } from './requirement/requirement.component';
import { ObjectiveSummaryComponent } from './objective-summary/objective-summary.component';
import { NgModule } from '@angular/core';
import { CourseManagementUpdateComponent } from './course-management-update.component';
import { CourseManagementDetailComponent } from './course-management-detail.component';
import { CourseManagementComponent } from './course-management.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';


@NgModule({
  declarations: [CourseManagementUpdateComponent, CourseManagementDetailComponent,
    CourseManagementComponent, ObjectiveSummaryComponent, RequirementComponent],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ],
  providers: [MessageService, ConfirmationService, SlugifyPipe],
  exports: [CourseManagementComponent, CourseManagementUpdateComponent]
})
export class CourseManagementModule { }
