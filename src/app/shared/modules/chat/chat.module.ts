import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {SidebarModule} from 'primeng/sidebar';
import { MessageFormComponent } from './message/message-form.component';
@NgModule({
  declarations: [ChatComponent, MessageFormComponent],
  imports: [
    CommonModule,
    SidebarModule
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
