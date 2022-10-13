import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card-service';

@Component({
  selector: 'app-card-registration',
  templateUrl: './card-registration.component.html',
  styleUrls: ['./card-registration.component.css']
})
export class CardRegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  cards!: Card[]
  cardDetails!: Card[]
  cardDetailsMessage!: String


  constructor(@Inject(CardService) private cardService: CardService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(4)]],
        pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
      }
    )

    this.cards = this.cardService.getAllCards();
  }

  onSubmit() {
// write logic to mark form submitted

    if (this.registerForm?.invalid) {
      return
    } else {
      // Write code to generate card
      this.displayCardDetailsMessage();
    }
  }

  getCardDetails(){
}

  displayCardDetailsMessage() {
    this.getCardDetails();
    this.cardDetailsMessage = "Card Number: " + this.cardDetails[0]?.cardNumber + "\nCVV: " + 
    this.cardDetails[0]?.cvv + "\nExpiry: " + this.cardDetails[0]?.expiry + "\nID: " + 
    this.cardDetails[0]?.id + "\nName: " + this.cardDetails[0]?.name + "\nPin: " + 
    this.cardDetails[0]?.pin;
    window.alert('Card Generated\nPlease save the following details\n' + this.cardDetailsMessage)

  }







}
