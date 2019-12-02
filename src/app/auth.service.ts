import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token'); 
}
}
