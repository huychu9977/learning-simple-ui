import { UserHeaderModule } from './../../core/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
@NgModule({
    declarations: [HeaderComponent],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      TieredMenuModule,
      UserHeaderModule
    ],
    exports: [HeaderComponent]
  })
  export class HeaderModule { }
