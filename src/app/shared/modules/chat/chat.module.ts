import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {SidebarModule} from 'primeng/sidebar';
import { SharedLibsModule } from '../../shared-libs.module';
import { MessageFormModule } from './message/message-form.module';
@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    SharedLibsModule,
    MessageFormModule,
    SidebarModule
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
