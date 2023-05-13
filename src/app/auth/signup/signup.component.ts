import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public authService: AuthService) { }

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
  }

  buildForm(){
    this.signupForm =  this.formBuilder.group({
      id: new FormControl(''),
      name : new FormControl('',[Validators.required]),
      surname : new FormControl('',[Validators.required]),
      phone : new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]),
      userName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      confirmPassword : new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(10)])
    });
  }

}
