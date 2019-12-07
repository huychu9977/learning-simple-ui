import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserHeaderComponent } from './user-header.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    TieredMenuModule,
    OverlayPanelModule
  ],
  exports: [UserHeaderComponent]
})
export class UserHeaderModule { }
