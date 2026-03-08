import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginRequest, LoginResponse } from '@repo/types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(loginDto);
    }
}
