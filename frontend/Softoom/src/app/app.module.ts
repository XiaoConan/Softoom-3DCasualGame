import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaleCharacterComponent } from './components/male-character/male-character.component';
import { FemaleCharacterComponent } from './components/female-character/female-character.component';

@NgModule({
  declarations: [
    AppComponent,
    MaleCharacterComponent,
    FemaleCharacterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
