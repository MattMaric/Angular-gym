import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class GuardService implements CanActivate{
    constructor(
        public authService: AuthService,
        public router: Router
    ){}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // throw new Error('Method not implemented.');
        if(this.authService.isLoggedIn !== true){
            this.router.navigate(['login'])
        }
        return true;
     }
}

  