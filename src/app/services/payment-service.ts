import { Inject, Injectable } from "@angular/core";
import { Card } from "../models/card";
import { Payment } from "../models/payment";
import { CardService } from "./card-service";

@Injectable({
    providedIn: 'root'
})
export class PaymentService{
  public payments: Payment[] = [];
  payment!: Payment;
  cards:Card[] = []
  executePayment(value: any): boolean {
    this.cards = this.cardService.getAllCards();

    var temp = this.cards.find(c => c.cardNumber == value.cardNumber)
    
    if(temp == undefined){
      return false
    }else {
      var exDate = value.month+"/"+value.year
      if(temp.cvv != value.cvv ){
        return false;
      }else if(temp.pin != value.pin){
        return false;
      }else if(temp.expiry != exDate){
        return false;
      }
    }
      
    this.payment = new Payment(this.payments.length+1,temp,new Date(), value.amount)
    this.payments.push(this.payment)
    return true
  }
  constructor(@Inject(CardService) private cardService: CardService){
  }
  getAllPayments(): Payment[] {
    return this.payments;
  }  
}