import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
// @Controller('auth')
// export class AuthController {
//   @Get('google')
//   @UseGuards(AuthGuard('google'))
//   googleAuth() {}

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
//     res.redirect(`http://localhost:4200/todo`);
//   }
// }

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
  @Get('signout')
  @UseGuards(AuthGuard())
  signOut(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {}); // Log out the user
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.redirect('http://localhost:4200/login');
    return 'Successfully signed out';
  }
}