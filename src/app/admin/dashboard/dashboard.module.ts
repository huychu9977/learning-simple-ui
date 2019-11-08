import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AlertModule } from 'ngx-bootstrap';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedLibsModule,
    AlertModule.forRoot()
  ]
})
export class DashboardModule { }
