import { PageProfileRoutingModule } from './page-profile-routing.module';
import { PageProfileComponent } from './page-profile.component';
import { NgModule } from '@angular/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';
import { BannerImageModule } from 'src/app/shared/modules/banner-image/banner-image.module';

@NgModule({
  declarations: [PageProfileComponent, EditProfileComponent],
  imports: [
    SharedLibsModule,
    BannerImageModule,
    PageProfileRoutingModule
  ],
  exports: [PageProfileComponent, EditProfileComponent]
})
export class PageProfileModule { }
