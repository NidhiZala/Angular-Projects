import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  
  // handleGoogleRedirect() {
  //   const url = window.location.href;

  //   if (url.includes('/auth/google/redirect')) {
  //     this.http.get<any>('http://localhost:3000/auth/google/redirect').subscribe(
  //       (response) => {
  //         const redirectTo = response.redirectTo;
  //         window.location.href = redirectTo;
  //       },
  //       (error) => {
  //         console.error(error);
  //         // Handle error
  //       }
  //     );
  //   }
  // }
}
