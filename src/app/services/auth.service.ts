
import { Injectable, NgZone } from '@angular/core';
import {Router} from "@angular/router";
import * as auth from 'firebase/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';



export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
  token!: string;
  userData: any;
   
  constructor(
    private _router:Router,
    private _snackBar:MatSnackBar,
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public ngZone: NgZone
    ){
    this.angularFireAuth.authState.subscribe((user) => {
        if(user){
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user')!);
        } else {
            localStorage.setItem('user', 'null');
            JSON.parse(localStorage.getItem('user')!);
        }
    });
   }

SignUp(email: string, password: string){ 
    return this.angularFireAuth 
     .createUserWithEmailAndPassword(email, password)  
    .then((result) => {
     this.SendVerificationMail();
     this.SetUserData(result.user);
     this._snackBar.open('Sign Up is successfully', 'OK', {
        duration: 3000,
      });
     this._router.navigate(['']);
    })                                                              
    .catch((error) => 
    this._snackBar.open('Your account has not been created successfully.Email and password are required. Important:password must be at least 6 characters!', 'OK', {
        duration: 8000,
      }));
}
SendVerificationMail(){
    return this.angularFireAuth.currentUser
    .then((u:any) => u.sendEmailVerification())
    .then(() => {
        this._router.navigate(['verify-email-address']);
    });
}

SetUserData(user:any){
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
    `users/${user.uid}`
    );
    const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified        
    };
    return userRef.set(userData,{
       merge: true, 
    });
}
SignIn(email: string, password: string){ 
    return this.angularFireAuth
    .signInWithEmailAndPassword(email,password)
    .then((result) => {
        this.ngZone.run(() => {
            this._router.navigate(['']);            
        });
        this.SetUserData(result.user);
        this.isLoggedIn;
        
    })
    .catch((error) => {
        this._snackBar.open('Login is not successfully, check your data or Sign up', 'OK', {
            duration: 3000,  
    })
})
}

get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  
}

GetToken(){
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = user !== null ? user.stsTokenManager.accessToken : null;
    return token;
}
SignOut(){
    return this.angularFireAuth.signOut().then(() =>{
        localStorage.removeItem('user');
        this._router.navigate(['login']);
    })
}


logout(){
    /*firebase.auth().signOut();
    this.token = null;*/
}
}
