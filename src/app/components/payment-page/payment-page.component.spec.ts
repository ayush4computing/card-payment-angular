import { PaymentHistoryPageComponent } from '../../components/payment-history-page/payment-history-page.component';
import { PaymentPageComponent } from '../../components/payment-page/payment-page.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HideCardNumberPipe } from '../../hide-card-number.pipe';

describe('PaymentPageComponent', () => {
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
        PaymentPageComponent,
        PaymentPageComponent,
        PaymentHistoryPageComponent,
        HideCardNumberPipe
      ],
    }).compileComponents();
   
  });

  
  it('Name should be of min length 4 in Payments Page Form', () => {
    const paymentPageFixture = TestBed.createComponent(PaymentPageComponent);
    const paymentPageInstance = paymentPageFixture.componentInstance
    paymentPageFixture.detectChanges();
    paymentPageInstance.paymentForm.controls['name'].setValue('Jai');
    paymentPageFixture.detectChanges();
    expect(paymentPageInstance.paymentForm.controls['name'].errors).toBeDefined();
  });

  it('Card CVV should be of 3 digits in Payments Page Form', () => {
    const paymentPageFixture = TestBed.createComponent(PaymentPageComponent);
    const paymentPageInstance = paymentPageFixture.componentInstance
    paymentPageFixture.detectChanges();
    paymentPageInstance.paymentForm.controls['cvv'].setValue('1234');
    paymentPageFixture.detectChanges();
    expect(paymentPageInstance.paymentForm.controls['cvv'].errors).toBeDefined();
  });

  it('Card Pin should not be less than 6 digit in Payment Page Form', () => {
    const paymentPageFixture = TestBed.createComponent(PaymentPageComponent);
    const paymentPageInstance = paymentPageFixture.componentInstance
    paymentPageFixture.detectChanges();
    paymentPageInstance.paymentForm.controls['pin'].setValue('12345');
    paymentPageFixture.detectChanges();
    expect(paymentPageInstance.paymentForm.controls['pin'].errors).toBeDefined();
  });

  it('Card Pin should not be greater than 6 digit in Payment Page Form', () => {
    const paymentPageFixture = TestBed.createComponent(PaymentPageComponent);
    const paymentPageInstance = paymentPageFixture.componentInstance
    paymentPageFixture.detectChanges();
    paymentPageInstance.paymentForm.controls['pin'].setValue('1234567');
    paymentPageFixture.detectChanges();
    expect(paymentPageInstance.paymentForm.controls['pin'].errors).toBeDefined();
  });

  
  it('onPay() should submit the payment form', () => {
    const paymentPageFixture = TestBed.createComponent(PaymentPageComponent);
    const paymentPageInstance = paymentPageFixture.componentInstance
    paymentPageFixture.detectChanges();
    paymentPageInstance.onPay();
    paymentPageFixture.detectChanges();
    expect(paymentPageInstance.submitted).toEqual(true);
  });


});
