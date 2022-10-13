import { PaymentHistoryPageComponent } from '../../components/payment-history-page/payment-history-page.component';
import { PaymentPageComponent } from '../../components/payment-page/payment-page.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardRegistrationComponent } from '../../components/card-registration/card-registration.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HideCardNumberPipe } from '../../hide-card-number.pipe';

describe('PaymentHistoryPageComponent', () => {
  let payment: any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule
      ],
      declarations: [
        AppComponent,
        CardRegistrationComponent,
        PaymentPageComponent,
        PaymentHistoryPageComponent,
        HideCardNumberPipe
      ],
    }).compileComponents();
   payment = [{
    amount: 123456,
    card: {
      cardNumber: '1234567891011234',
      cvv: 123,
      expiry: '2022/12',
      id: 1234567890123456,
      name: 'Jane Doe',
      pin: 123456
    },
    date: new Date('Thu Oct 13 2022 22:32:11'),
    id: 1234567890123456
  }]
  });
  
  it('Only last 4 digits of the card number should be displayed, rest should be marked with X on payment history page', () => {
    const paymentHistoryFixture = TestBed.createComponent(PaymentHistoryPageComponent);
    const paymentPageInstance = paymentHistoryFixture.componentInstance;
    paymentPageInstance.payments = payment
    paymentHistoryFixture.detectChanges();
    const cardNumber = paymentHistoryFixture.nativeElement.querySelector('.transaction-date');
    expect((cardNumber.textContent as string).trim()).toBe('Oct 13, 2022, 10:32:11 PM');
  });

  it('Timestamp should be shown in "MMM d, y, h:mm:ss a" format on payment history page', () => {
    const paymentHistoryFixture = TestBed.createComponent(PaymentHistoryPageComponent);
    const paymentPageInstance = paymentHistoryFixture.componentInstance;
    paymentPageInstance.payments = payment
    paymentHistoryFixture.detectChanges();
    const cardNumber = paymentHistoryFixture.nativeElement.querySelector('.transaction-date');
    expect((cardNumber.textContent as string).trim()).toBe('Oct 13, 2022, 10:32:11 PM');
  });

  it('Card name should be shown on payment history page', () => {
    const paymentHistoryFixture = TestBed.createComponent(PaymentHistoryPageComponent);
    const paymentPageInstance = paymentHistoryFixture.componentInstance;
    paymentPageInstance.payments = payment
    paymentHistoryFixture.detectChanges();
    const cardNumber = paymentHistoryFixture.nativeElement.querySelector('.card-name');
    expect((cardNumber.textContent as string).trim()).toBe('Jane Doe');
  });

  it('Payment ID should be shown on payment history page', () => {
    const paymentHistoryFixture = TestBed.createComponent(PaymentHistoryPageComponent);
    const paymentPageInstance = paymentHistoryFixture.componentInstance;
    paymentPageInstance.payments = payment
    paymentHistoryFixture.detectChanges();
    const cardNumber = paymentHistoryFixture.nativeElement.querySelector('.payment-id');
    expect((cardNumber.textContent as string).trim()).toBe('1234567890123456');
  });
});
