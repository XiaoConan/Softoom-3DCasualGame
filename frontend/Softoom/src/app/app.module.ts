import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaleCharacterComponent } from './components/male-character/male-character.component';
import { FemaleCharacterComponent } from './components/female-character/female-character.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FoodMenuComponent } from './components/food-menu/food-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StorageComponent } from './components/storage/storage.component';
import { AuthModule } from '@auth0/auth0-angular';
import { CreditComponent } from './components/credit/credit.component';

@NgModule({
  declarations: [
    AppComponent,
    MaleCharacterComponent,
    FemaleCharacterComponent,
    HomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    FoodMenuComponent,
    StorageComponent,
    CreditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    AuthModule.forRoot({
      domain: 'dev-ls4ookwxd2iqufde.us.auth0.com',
      clientId: 'OZOKua17FKuqqA647WQKzPJTHgI47Cou',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
