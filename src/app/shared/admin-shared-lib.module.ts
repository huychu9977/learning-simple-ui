import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

@NgModule({
  declarations: [],
  exports: [
    TranslateModule,
    RouterModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    EditorModule,
    ConfirmDialogModule,
    ToastModule,
    NgSelectModule,
    DynamicDialogModule
  ]
})
export class AdminSharedLibsModule {}
