import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

  cardForm!:FormGroup;
  showSpinner:boolean=false;



  constructor(
    private fb:FormBuilder,
    private dialogRef:MatDialogRef<CardModalComponent>,
    private cardService:CardService,
    private _snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data:Card,
    private snackBarService:SnackbarService
  ) { }

  ngOnInit(): void {

    this.cardForm=this.fb.group({
      name:    [this.data?.name||"",Validators.maxLength(50)],
      title:   [this.data?.title||"",[Validators.required,Validators.maxLength(255)]],
      phone:   [this.data?.phone||"",[Validators.required, Validators.maxLength(20)]],
      email:   [this.data?.email||"",[Validators.email, Validators.maxLength(50)]],
      address: [this.data?.address||"",[Validators.maxLength(255)]]
    });
  }


  addCard():void{
    this.showSpinner=true;
    this.cardService.addCard(this.cardForm.value).subscribe((res:any)=>{
     this.getSuccess(res||"Kartvizit başarıyla eklendi.")
    },(err:any)=>{

      this.getError(err.message || " Bir hata oluştu.")
    });
  }

  updateCard():void{
    this.showSpinner=true;
    this.cardService.updateCard(this.cardForm.value,this.data.id)
    .subscribe((res:any)=>{     
      this.getSuccess(res||"Kartvizit başarıyla güncellendi.")
    },(err:any)=>{

      this.getError(err.message || " Bir hata oluştu.")
    });
  }

  deleteCard():void{
    this.showSpinner=true;
    this.cardService.deleteCard(this.data.id)
    .subscribe((res:any)=>{
      this.getSuccess(res||"Kartvizit başarıyla silindi.")
    },(err:any)=>{

      this.getError(err.message || " Bir hata oluştu.")
    })
  }

  getSuccess(message:string):void{
    this.snackBarService.createSnackbar("success",message);
    this.cardService.getCards();
    this.showSpinner=false;
    this.dialogRef.close();
  }

  getError(message:string){

      this.snackBarService.createSnackbar("error",message);
      this.showSpinner=false;
   
  }
}
