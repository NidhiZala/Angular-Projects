import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  // validateGoogleUser(accessToken: string, refreshToken: string, profile: any): any {
  //   // Perform any additional logic with the validated user
  //   return profile;
  // }
  googleLogin(req, res) {
    if (!req.user) {
      return 'No user from Google';
    }

    // Handle the callback logic here, e.g., save user data to database, issue JWT token, etc.
    // ...

    // Redirect the user after successful authentication
    res.redirect('http://localhost:4200/todo'); // Replace with your desired redirect URL
  }
  signOut(req, res) {
    // Perform any sign out logic here, if necessary
    // For example, you can clear session data or remove tokens

    // Return a response to indicate successful sign out
    res.redirect('http://localhost:4200/login');
    return { message: 'Sign out successful' };
  }
  hello() {
    return 'Hello';
  }
}
