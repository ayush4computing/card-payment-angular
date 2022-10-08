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
  

  constructor(@Inject(CardService) private cardService: CardService, private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name:['', [Validators.required, Validators.minLength(4)]],
        pin:['', [Validators.required,Validators.minLength(6), Validators.maxLength(6),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
      }
    )

    this.cards = this.cardService.getAllCards();
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }else{
      this.cardService.generateCard(this.registerForm.value.name,this.registerForm.value.pin)
    }

  }



  
  
}
