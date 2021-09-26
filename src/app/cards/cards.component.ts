import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

cards!:Card[];

  constructor(
    public dialog:MatDialog,
    public cardService:CardService
  ) { }

  ngOnInit(): void {
   this.cardService.getCards();
  }

  openAddCardModal(){
    this.dialog.open(CardModalComponent,{
      width:"400px"
    });

  }

}
