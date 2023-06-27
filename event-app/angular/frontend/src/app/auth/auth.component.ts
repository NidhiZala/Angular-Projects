import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  signInWithGoogle(): void {
    window.location.href = 'http://localhost:3000/auth/google';
  }
  
}
