import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardRegistrationComponent } from './components/card-registration/card-registration.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { PaymentHistoryPageComponent } from './components/payment-history-page/payment-history-page.component';
import { HideCardNumberPipe } from './hide-card-number.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CardRegistrationComponent,
    PaymentPageComponent,
    PaymentHistoryPageComponent,
    HideCardNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
