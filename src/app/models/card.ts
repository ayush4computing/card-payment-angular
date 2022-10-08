export class Card{
    id: number = -1;
    name: string = "";
    cardNumber: string = "";
    expiry: string = "";
    cvv: number = -1;
    pin: number = -1;
    constructor(id:number, name: string, cardNumber: string, expiry: string, cvv: number, pin: number){
        this.id = id;
        this.name = name;
        this.cardNumber = cardNumber;
        this.expiry = expiry;
        this.cvv = cvv;
        this.pin = pin;
    }
}