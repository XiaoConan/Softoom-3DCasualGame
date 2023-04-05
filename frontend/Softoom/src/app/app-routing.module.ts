import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FemaleCharacterComponent } from './components/female-character/female-character.component';
import { MaleCharacterComponent } from './components/male-character/male-character.component';
import { FoodMenuComponent } from './components/food-menu/food-menu.component';
import { CreditComponent } from './components/credit/credit.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'room/female', component: FemaleCharacterComponent },
  { path: 'room/male', component: MaleCharacterComponent },
  { path: 'food', component: FoodMenuComponent },
  { path: 'credit', component: CreditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
