import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): string;
    googleRedirect(req: any, res: any): void;
    signOut(req: any, res: any): void;
}
