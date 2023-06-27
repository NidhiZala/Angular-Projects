import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  signInWithGoogle(): void {
    window.location.href = 'http://localhost:3000/auth/google';
    // this.authService.signInWithGoogle().subscribe(
    //   () => {
    //     this.router.navigate(['/todo']);
    //   },
    //   (error) => {
    //     console.log('Error occurred', error);
    //   }
    // );
  }
}
