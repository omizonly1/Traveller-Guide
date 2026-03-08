import { AuthService } from './auth.service';
import type { LoginRequest, LoginResponse } from '@repo/types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginRequest): Promise<LoginResponse>;
}
