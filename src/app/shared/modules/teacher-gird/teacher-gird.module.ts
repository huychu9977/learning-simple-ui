import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherGirdComponent } from './teacher-gird.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TeacherGirdComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TeacherGirdComponent]
})
export class TeacherGirdModule { }
