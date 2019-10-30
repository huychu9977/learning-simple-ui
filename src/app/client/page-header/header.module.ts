import { UserHeaderModule } from './../../core/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
      CommonModule,
      RouterModule,
      BsDropdownModule.forRoot(),
      FormsModule,
      UserHeaderModule
    ],
    exports: [HeaderComponent]
  })
  export class HeaderModule { }
