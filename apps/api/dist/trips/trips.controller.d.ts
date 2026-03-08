import { TripsService } from './trips.service';
import type { TripDto } from '@repo/types';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(createTripDto: Omit<TripDto, 'id'>): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findByCode(code: string): Promise<any>;
    update(id: string, updateTripDto: Partial<TripDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
