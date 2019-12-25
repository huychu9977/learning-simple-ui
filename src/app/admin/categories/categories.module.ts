import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { CategoriesUpdateComponent } from './categories-update.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { AdminSharedLibsModule } from 'src/app/shared/admin-shared-lib.module';

@NgModule({
  declarations: [CategoriesComponent, CategoriesUpdateComponent],
  imports: [
    SharedLibsModule,
    AdminSharedLibsModule
  ]
})
export class CategoriesModule { }
