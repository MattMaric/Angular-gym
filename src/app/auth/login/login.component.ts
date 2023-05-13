import { Component, OnInit } from '@angular/core';
import {  NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  signinForm!: FormGroup;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              
   ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.signinForm =  this.formBuilder.group({
      id: new FormControl(''),
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('', Validators.required)
    });
  }
}
