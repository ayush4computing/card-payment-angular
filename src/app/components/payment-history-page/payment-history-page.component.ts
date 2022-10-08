import { Component, Inject, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment-service';

@Component({
  selector: 'app-payment-history-page',
  templateUrl: './payment-history-page.component.html',
  styleUrls: ['./payment-history-page.component.css']
})
export class PaymentHistoryPageComponent implements OnInit {

  payments: Payment[] = [];
  

  constructor(@Inject(PaymentService) private paymentService: PaymentService) {
    this.payments = this.paymentService.getAllPayments();
  }

  ngOnInit(): void {
  }

}
