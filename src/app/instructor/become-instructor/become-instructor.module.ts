import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeInstructorComponent } from './become-instructor.component';
import {StepsModule} from 'primeng/steps';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {SidebarModule} from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [BecomeInstructorComponent],
  imports: [
    StepsModule,
    PdfViewerModule,
    SidebarModule,
    ToastModule,
    SharedLibsModule
  ]
})
export class BecomeInstructorModule { }
