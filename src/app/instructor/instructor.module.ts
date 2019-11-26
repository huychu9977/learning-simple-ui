import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { BecomeInstructorModule } from './become-instructor/become-instructor.module';
import { HeaderModule } from '../client/page-header/header.module';
import { CoursesModule } from './courses/courses.module';
import { InstructorRoutingModule } from './instructor-routing.module';

@NgModule({
  declarations: [InstructorComponent],
  imports: [
    CommonModule,
    BecomeInstructorModule,
    CoursesModule,
    HeaderModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
