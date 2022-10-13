import { PaymentHistoryPageComponent } from '../../components/payment-history-page/payment-history-page.component';
import { PaymentPageComponent } from '../../components/payment-page/payment-page.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardRegistrationComponent } from '../../components/card-registration/card-registration.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HideCardNumberPipe } from '../../hide-card-number.pipe';
import { Card } from 'src/app/models/card';

describe('CardRegistrationComponent', () => {
  let card: any
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
    card =  {
      0:{
        cardNumber: '123456',
        cvv: 123,
        expiry: '2022/12',
        id: 1234567890123456,
        name: 'Jane Doe',
        pin: 123456
      }
    }
  });

  it('Name should be of min length 4 in card registration form', () => {
    const cardRegistrationFixture = TestBed.createComponent(CardRegistrationComponent);
    const cardRegistrationInstance = cardRegistrationFixture.componentInstance
    cardRegistrationFixture.detectChanges();
    cardRegistrationInstance.registerForm.controls['name'].setValue('Jai');
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationInstance.registerForm.controls['name'].errors).toBeDefined();
  });

  it('Pin should not be less than 6 digit in card registration form', () => {
    const cardRegistrationFixture = TestBed.createComponent(CardRegistrationComponent);
    const cardRegistrationInstance = cardRegistrationFixture.componentInstance
    cardRegistrationFixture.detectChanges();
    cardRegistrationInstance.registerForm.controls['pin'].setValue('12345');
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationInstance.registerForm.controls['pin'].errors).toBeDefined();
  });

  it('Pin should not be greater than 6 digit in card registration form', () => {
    const cardRegistrationFixture = TestBed.createComponent(CardRegistrationComponent);
    const cardRegistrationInstance = cardRegistrationFixture.componentInstance
    cardRegistrationFixture.detectChanges();
    cardRegistrationInstance.registerForm.controls['pin'].setValue('1234567');
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationInstance.registerForm.controls['pin'].errors).toBeDefined();
  });

  it('onSubmit() should submit the card registration form', () => {
    const cardRegistrationFixture = TestBed.createComponent(CardRegistrationComponent);
    const cardRegistrationInstance = cardRegistrationFixture.componentInstance
    cardRegistrationInstance.onSubmit();
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationInstance.submitted).toEqual(true);
  });

  it('getCardDetails() should get all the card details', () => {
    const cardRegistrationFixture = TestBed.createComponent(CardRegistrationComponent);
    const cardRegistrationInstance = cardRegistrationFixture.componentInstance
    cardRegistrationInstance.getCardDetails();
    cardRegistrationFixture.detectChanges();
    expect(cardRegistrationInstance.cardDetails).toBeDefined();
  });

});
