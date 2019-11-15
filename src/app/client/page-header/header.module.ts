import { UserHeaderModule } from './../../core/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      UserHeaderModule
    ],
    exports: [HeaderComponent]
  })
  export class HeaderModule { }
