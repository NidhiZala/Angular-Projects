import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
    googleLogin(req, res) {
        if (!req.user) {
          return 'No user from Google';
        }
        res.redirect('http://localhost:4200/dashboard'); // Replace with your desired redirect URL
      }
      hello() {
        return 'Hello';
      }
}
