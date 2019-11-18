import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { BecomeInstructorModule } from './become-instructor/become-instructor.module';
import { BecomeInstructorComponent } from './become-instructor/become-instructor.component';
import { FooterModule } from '../client/page-footer/footer.module';
import { HeaderModule } from '../client/page-header/header.module';


const instructorRoute: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        path: 'become-instructor',
        component: BecomeInstructorComponent
      },
      {
        path: 'become-instructor/step/:id',
        component: BecomeInstructorComponent
      }
    ]
  }
];
@NgModule({
  declarations: [InstructorComponent],
  imports: [
    CommonModule,
    BecomeInstructorModule,
    FooterModule,
    HeaderModule,
    RouterModule.forChild(instructorRoute)
  ]
})
export class InstructorModule { }
