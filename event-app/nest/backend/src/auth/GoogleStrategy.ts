import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '62317483405-hqer64975orhh8d1g74q64p1r03db4ua.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['profile', 'email']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const user = {
      accessToken,
      refreshToken,
      profile,
    };
    const frontendURL = 'http://localhost:4200/dashboard';
    done(null, { redirectTo: frontendURL });
  }  
}
