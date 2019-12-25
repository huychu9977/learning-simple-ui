import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserHeaderComponent } from './user-header.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ChatModule } from '../chat/chat.module';
import { SharedLibsModule } from '../../shared-libs.module';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    RouterModule,
    TieredMenuModule,
    OverlayPanelModule,
    ChatModule,
    SharedLibsModule,
    DialogModule
  ],
  exports: [UserHeaderComponent]
})
export class UserHeaderModule { }
