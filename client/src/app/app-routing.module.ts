import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {CollectionComponent} from "./components/collection/collection.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {HighlightItemComponent} from "./components/highlight-item/highlight-item.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'highlight', component: HighlightItemComponent},
  {path: '', component: LoginComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
