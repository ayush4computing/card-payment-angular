import { PaymentHistoryPageComponent } from './components/payment-history-page/payment-history-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardRegistrationComponent } from './components/card-registration/card-registration.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HideCardNumberPipe } from './hide-card-number.pipe';

describe('AppComponent', () => {
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
  });

  it('Register button disabled until form valid', () => {
    const cardRegistrationFixture = TestBed.createComponent(CardRegistrationComponent);
    const cardRegistrationInstance = cardRegistrationFixture.componentInstance
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationFixture.debugElement.query(By.css('.btn')).nativeElement.disabled).toBeTruthy();
    cardRegistrationInstance.registerForm.controls['name'].setValue('Jane Doe');
    cardRegistrationInstance.registerForm.controls['pin'].setValue('123456');
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationFixture.debugElement.query(By.css('.btn')).nativeElement.disabled).toBeFalsy();
  });

  it('Pay button disabled untill form valid', () => {
    const paymentPageFixture = TestBed.createComponent(PaymentPageComponent);
    const paymentPageInstance = paymentPageFixture.componentInstance
    paymentPageFixture.detectChanges();
    expect(paymentPageFixture.debugElement.query(By.css('.btn')).nativeElement.disabled).toBeTruthy();
    paymentPageInstance.paymentForm.controls['name'].setValue('Jane Doe');
    paymentPageInstance.paymentForm.controls['cardNumber'].setValue('123456');
    paymentPageInstance.paymentForm.controls['cvv'].setValue('123');
    paymentPageInstance.paymentForm.controls['pin'].setValue('123456');
    paymentPageInstance.paymentForm.controls['month'].setValue('12');
    paymentPageInstance.paymentForm.controls['year'].setValue('2022');
    paymentPageInstance.paymentForm.controls['amount'].setValue('123456');
    paymentPageFixture.detectChanges();
    expect(paymentPageFixture.debugElement.query(By.css('.btn')).nativeElement.disabled).toBeFalsy();
  });

  it('Display payments on History page', () => {
    const paymentHistoryFixture = TestBed.createComponent(PaymentHistoryPageComponent);
    const paymentPageInstance = paymentHistoryFixture.componentInstance;
    paymentPageInstance.payments = [{
      amount: 123456,
      card: {
        cardNumber: '123456',
        cvv: 123,
        expiry: '2022/12',
        id: 1234567890123456,
        name: 'Jane Doe',
        pin: 123456
      },
      date: new Date(),
      id: 1234567890123456
    }
    ];
    expect(paymentHistoryFixture.debugElement.queryAll(By.css('tr')).length).toEqual(1);
  });
});
