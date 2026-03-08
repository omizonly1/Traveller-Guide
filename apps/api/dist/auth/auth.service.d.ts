import { JwtService } from '@nestjs/jwt';
import { TripsService } from '../trips/trips.service';
import { LoginRequest, LoginResponse } from '@repo/types';
export declare class AuthService {
    private jwtService;
    private tripsService;
    constructor(jwtService: JwtService, tripsService: TripsService);
    login(loginRequest: LoginRequest): Promise<LoginResponse>;
}
