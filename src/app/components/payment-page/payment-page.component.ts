import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment-service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  yearArr: string[]  = ["2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028"];
  monthArr: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  paymentForm!:FormGroup;
  submitted: boolean = false;
  paymentSuccess: boolean = false
  
  constructor(@Inject(PaymentService) private paymentService: PaymentService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(4)]],
      cardNumber: ['',[Validators.required, Validators.minLength(5),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cvv: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      pin: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      month: ['',[Validators.required]],
      year: ['',[Validators.required]],
      amount: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });

   
  }

  onPay(){
    this.submitted = true
    if(this.paymentForm.invalid){
      return
    }else{
      this.paymentSuccess = this.paymentService.executePayment(this.paymentForm.value)
      if(this.paymentSuccess)
        alert("Success ")
      else
        alert("Card Details not correct.")
    }
    // console.log(this.paymentForm.value)
  }

}
