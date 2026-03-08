import { PassengersService } from './passengers.service';
import type { PassengerDto } from '@repo/types';
export declare class PassengersController {
    private readonly passengersService;
    constructor(passengersService: PassengersService);
    create(createPassengerDto: Omit<PassengerDto, 'id'>): Promise<any>;
    createBulk(passengers: Omit<PassengerDto, 'id'>[]): Promise<any>;
    findByTrip(tripId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePassengerDto: Partial<PassengerDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
