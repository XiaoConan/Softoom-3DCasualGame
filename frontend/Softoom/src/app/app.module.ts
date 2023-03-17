import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaleCharacterComponent } from './components/male-character/male-character.component';
import { FemaleCharacterComponent } from './components/female-character/female-character.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MaleCharacterComponent,
    FemaleCharacterComponent,
    HomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
