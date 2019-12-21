import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticalComponent } from './statistical.component';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [StatisticalComponent],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class StatisticalModule { }
