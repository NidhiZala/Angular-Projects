import { Controller, Get,Post, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res); // Pass the response object to the service method
  }

  @Get('google/redirect')
  googleRedirect(@Req() req, @Res() res) {
    const redirectUrl = 'http://localhost:4200/dashboard'; // Replace with your actual Angular dashboard URL
    res.redirect(redirectUrl);
  }

  @Post('/sign-out')
  signOut(@Req() req, @Res() res) {
    const url = req.url;
    console.log('URL:', url);
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    res.redirect('http://localhost:4200'); // Redirect to localhost:4200 after sign-out
  }
}