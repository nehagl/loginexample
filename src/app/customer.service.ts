import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';
const EMAIL = 'EMAIL';
const PASSWORD = 'PASSWORD';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  // setemail(email:any , password:any):void{
  //   localStorage.setItem(EMAIL,email);
  //   localStorage.setItem(PASSWORD,password);
  // }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  // isLogged() {
  //  return localStorage.getItem(EMAIL) != null ;
  
  // }

}
