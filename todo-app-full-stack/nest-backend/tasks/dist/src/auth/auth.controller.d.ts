import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): string;
    signOut(req: Request, res: Response): string;
}
