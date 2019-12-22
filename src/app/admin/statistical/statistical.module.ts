import { NgModule } from '@angular/core';
import { StatisticalComponent } from './statistical.component';
import {ChartModule} from 'primeng/chart';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [StatisticalComponent],
  imports: [
    ChartModule,
    SharedLibsModule,
    AdminSharedLibsModule,
    TabViewModule
  ]
})
export class StatisticalModule { }
