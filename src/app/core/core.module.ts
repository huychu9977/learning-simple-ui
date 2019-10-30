import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LoginModalModule } from '../client/login/login.module';
import { CookieModule } from 'ngx-cookie';
import { NgxWebstorageModule } from 'ngx-webstorage';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
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
    {
      provide: LOCALE_ID,
      useValue: 'en'
    },
    DatePipe
  ]
})
export class CoreModule {
}
