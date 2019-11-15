import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedLibsModule
  ]
})
export class DashboardModule { }
