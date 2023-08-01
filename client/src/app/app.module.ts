import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './src/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SideNavOuterToolbarModule } from './layouts';
import { ScreenService } from './shared/services/screen.service';
import { FooterModule } from './shared/components/footer/footer.component';
import { HomepageModule } from './src/homepage/homepage.module';
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
  ],
  providers: [ScreenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
