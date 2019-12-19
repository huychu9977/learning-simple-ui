import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LoginModalModule } from '../client/login/login.module';
import { CookieModule } from 'ngx-cookie';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginModalComponent } from '../client/login/login.component';
import {DynamicDialogModule, DialogService} from 'primeng/dynamicdialog';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    DynamicDialogModule,
    LoginModalModule,
    HttpClientModule,
    CookieModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Title,
    DialogService,
    {
      provide: LOCALE_ID,
      useValue: 'en'
    },
    DatePipe
  ],
  entryComponents: [LoginModalComponent]
})
export class CoreModule {
}
