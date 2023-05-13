import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNavbarCollapsed = true;
  userData:any;

  constructor(public _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this.userData = this._authService.userData;
  }
  signout(){
    this._authService.SignOut();
   }
}
