import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TripsService } from '../trips/trips.service';
import { LoginRequest, LoginResponse } from '@repo/types';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private tripsService: TripsService,
    ) { }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        try {
            // For mobile app Pilgrims, we allow login via the Trip Code right now.
            // In a production app you would verify the specific passenger ID.
            const trip = await this.tripsService.findByCode(loginRequest.codeOrId);

            const payload = { sub: trip.id, role: 'PILGRIM' };
            const token = this.jwtService.sign(payload);

            return {
                token,
                passenger: {
                    id: 'temp-passenger-id',
                    tripId: trip.id,
                    firstName: 'Demo',
                    lastName: 'User',
                    passportNo: 'MASKED',
                }
            };
        } catch (e) {
            throw new UnauthorizedException('Invalid login credentials');
        }
    }
}
