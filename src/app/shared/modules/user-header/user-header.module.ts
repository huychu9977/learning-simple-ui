import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserHeaderComponent } from './user-header.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ChatModule } from '../chat/chat.module';
@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    TieredMenuModule,
    OverlayPanelModule,
    ChatModule
  ],
  exports: [UserHeaderComponent]
})
export class UserHeaderModule { }
