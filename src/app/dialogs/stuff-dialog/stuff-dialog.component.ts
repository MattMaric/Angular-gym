import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StuffService } from 'src/app/services/stuff.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stuff-dialog',
  templateUrl: './stuff-dialog.component.html',
  styleUrls: ['./stuff-dialog.component.css']
})
export class StuffDialogComponent implements OnInit {
 
  stuffForm!: FormGroup;
  url = '';

  constructor(private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _stuffService: StuffService,
    private _snackBar: MatSnackBar) { }

   /*phone validation*/
    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;  
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
      }
    }  
    
    ngOnInit(): void {
      this.buildForm();
      if (this.data.editStuff) {
        this.url = this.data.editStuff.photo;
      } else {
        this.url = "../../../assets/imgs/avatar-membership.png"
      }
      this.stuffForm.patchValue(this.data.editStuff);
    }

    buildForm(){
      this.stuffForm =  this.formBuilder.group({
        id: new FormControl(''),
        name : new FormControl('',[Validators.required]),
        surname : new FormControl('',[Validators.required]),
        phone : new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]),
        role : new FormControl('',[Validators.required]),
        email : new FormControl('',[Validators.required,Validators.email]),
        photo : new FormControl('', Validators.required)
      });
    }

    selectFile(event: any) {
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.stuffForm.controls['photo'].setValue(this.url);
        }
      }
    }

    get f() { return this.stuffForm.controls; }

    addOrEdit(){
    if(this.stuffForm.controls['id'].value){
      this._stuffService.putStuffs(this.stuffForm.value)
     .subscribe(res=>
      {  },
      (err)=> {
      });
      this._snackBar.open('Edit is succssesful.', 'OK',{
        duration: 3000,}) 
     }
    else {
       this._stuffService.postStuffs(this.stuffForm.value)
      .subscribe(res=> 
        {
     },
        (err)=> {
            
        });
        this._snackBar.open('Added is succssesful.', 'OK',{
          duration: 3000,})
      }    
        this.closeDialog(); 
    }
    
    closeDialogHint() {
      this._dialogRef.close((this.data.hint));
    }

    closeDialog(){
      this._dialogRef.close();
    }
} 


