import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageFormComponent } from './message-form.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MessageFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MessageFormComponent]
})
export class MessageFormModule { }
