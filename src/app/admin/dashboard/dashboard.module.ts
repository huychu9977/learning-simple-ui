import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedLibsModule,
    PdfViewerModule,
    SidebarModule
  ]
})
export class DashboardModule { }
