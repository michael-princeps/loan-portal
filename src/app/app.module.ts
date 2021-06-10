import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { environment } from 'src/environments/environment';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain
  },
  position: 'bottom',
  palette: {
    popup: {
      background: '#002E5B',
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#F56B2A',
      text: '#ffffff',
      border: 'transparent'
    }
  },
  theme: 'classic',
  type: 'info',
  // content: {
  //   message: 'Our website uses cookies to enhance your browsing experience. By continuing to browse this site you agree to the use of cookies. ',
  //   dismiss: 'Got it!',
  //   link: 'Visit our Privacy Policy to learn more',
  //   href: 'https://creditwallet.ng/privacy-policy'
  // }
  layout: 'cookie-layout',
  layouts: {
    'cookie-layout': '{{messagelink}}{{compliance}}'
  },
  elements:{
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}}
    Visit our <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> to learn more
    </span>
    `,
    dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>'
  },
  compliance: {
    'info': '<div class="cc-compliance">{{dismiss}}</div>',
    'opt-in': '<div class="cc-compliance cc-highlight"></div>',
    'opt-out': '<div class="cc-compliance cc-highlight"></div>',
   },
  content:{
    message: 'Our website uses cookies to enhance your browsing experience. By continuing to browse this site you agree to the use of cookies.',
    privacyPolicyLink: 'Privacy Policy',
    privacyPolicyHref: 'https://creditwallet.ng/wp-content/uploads/2021/06/privacy_policy.pdf',
    dismiss: 'I understand',
  }
};


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LoadingBarModule,
    BrowserModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NgxGoogleAnalyticsModule.forRoot(environment.gtag),
    NgxGoogleAnalyticsRouterModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
