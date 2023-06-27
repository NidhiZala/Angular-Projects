import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   constructor(private http: HttpClient) { }
  //  signInWithGoogle(): Observable<any> {
  //   return this.http.get('http://localhost:3000/api/auth/google');
  // }

  signOut(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/auth/signout');
  }
}
