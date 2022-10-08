import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardRegistrationComponent } from './components/card-registration/card-registration.component';
import { PaymentHistoryPageComponent } from './components/payment-history-page/payment-history-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';

const routes: Routes = [
  {path: "register", component: CardRegistrationComponent},
  {path: "pay", component: PaymentPageComponent},
  {path: "payments", component: PaymentHistoryPageComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
