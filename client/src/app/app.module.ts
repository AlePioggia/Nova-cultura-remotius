import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './src/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SideNavOuterToolbarModule } from './layouts';
import { ScreenService } from './shared/services/screen.service';
import { FooterModule } from './shared/components/footer/footer.component';
import { HomepageModule } from './src/homepage/homepage.module';
import { AuthInterceptor } from './auth.interceptor';
import { ReviewModule } from './src/review/review.module';
import { WalletModule } from './src/wallet/wallet.module';
import { DxToastModule } from 'devextreme-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
    SideNavOuterToolbarModule,
    FooterModule,
    HomepageModule,
    ReviewModule,
    WalletModule,
    DxToastModule,
  ],
  providers: [
    ScreenService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
