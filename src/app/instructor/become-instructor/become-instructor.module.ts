import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeInstructorComponent } from './become-instructor.component';
import {StepsModule} from 'primeng/steps';
@NgModule({
  declarations: [BecomeInstructorComponent],
  imports: [
    CommonModule,
    StepsModule
  ]
})
export class BecomeInstructorModule { }
