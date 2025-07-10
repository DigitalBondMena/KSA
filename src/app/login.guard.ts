import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthoService } from './autho.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _AuthoserviceService:AuthoService , private _Router:Router) {}
 
  
  canActivate() {
    if (
      localStorage.getItem('cheklogin') === 'true' 
    ) {
      return true;
    } else {
      this._Router.navigate(['/login']);
      return false;
    }
  }
  
}
