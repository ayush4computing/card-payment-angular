import { Injectable } from "@angular/core";
import { Card } from "../models/card";

@Injectable({
    providedIn: 'root'
})
export class CardService{
  card!: Card
  public cards: Card[] = []



  getAllCards(): Card[] {
    return this.cards;
  }
    

    
  generateCard(name: any, pin: any) {
    var cardNumberStr = this.generateRandom16Digit();
    var expiryDateStr = this.generateExpiryDateStr();
    var cvvNumber = this. generateCvvNumber();

    if(this.cards.length==0){
        this.card = new Card(this.cards.length,name,cardNumberStr,expiryDateStr,cvvNumber,pin);
        this.cards.push(this.card)
    }else{
        this.card = new Card(this.cards.length+1,name,cardNumberStr,expiryDateStr,cvvNumber,pin);
        this.cards.push(this.card)
    }
    
    console.log(this.cards);
  }

    generateCvvNumber(): number {
        return Math.floor(100 + Math.random() * 900);
    }

    
    generateExpiryDateStr(): string {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var day = today.getDate();
      var c = new Date(year + 5, month, day);
      return c.getMonth()+"/"+c.getFullYear();
    }

  generateRandom16Digit(): string{
    var val1 = Math.floor(1000 + Math.random() * 9000);
    var val2 = Math.floor(1000 + Math.random() * 9000);
    var val3 = Math.floor(1000 + Math.random() * 9000);
    var val4 = Math.floor(1000 + Math.random() * 9000);

    return val1+""+val2+""+val3+""+val4
  }

  

}