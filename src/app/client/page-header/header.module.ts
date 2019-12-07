import { UserHeaderModule } from '../../shared/modules/user-header/user-header.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
      RouterModule,
      TieredMenuModule,
      AutoCompleteModule,
      UserHeaderModule,
      SharedLibsModule
    ],
    exports: [HeaderComponent]
  })
  export class HeaderModule { }
