import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

 cards!:Card[]

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private http:HttpClient,
    
  ) { }

  getCards():void{
    this.http.get<Card[]>(this.apiUrl+'/cards')
    .subscribe((res:any)=>{
      this.cards=res;
    });
  }

  addCard(card:Card){
    return this.http.post(this.apiUrl+"/cards",card);
  }
  updateCard(card:Card, cardId:number){
    return this.http.put(this.apiUrl+"/cards/"+cardId,card);
  }

  deleteCard(cardId:number){

    return this.http.delete(this.apiUrl+"/cards/"+cardId);
  }
}
