import { Card } from "./card";

export class Payment{
    id: number = -1; 
    card : Card = new Card(-1,"","","",-1,-1);
    date: Date = new Date();
    amount: number = -1; 
    
    constructor(id: number, card : Card, date: Date, amount: number){
        this.id = id;
        this.card = card;
        this.date = new Date();
        this.amount = amount;
    }
}