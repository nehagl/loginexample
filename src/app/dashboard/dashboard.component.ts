import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id: string;  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.id = localStorage.getItem('token');
  }

  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/']);  
  }  

}
