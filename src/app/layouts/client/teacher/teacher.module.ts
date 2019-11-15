import { TeacherComponent } from './teacher.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherGirdModule } from 'src/app/shared/modules/teacher-gird/teacher-gird.module';

@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    TeacherGirdModule
  ],
  exports: [TeacherComponent]
})
export class TeacherModule { }
