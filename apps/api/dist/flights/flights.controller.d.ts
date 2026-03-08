import { FlightsService } from './flights.service';
import type { FlightDto } from '@repo/types';
export declare class FlightsController {
    private readonly flightsService;
    constructor(flightsService: FlightsService);
    create(createFlightDto: Omit<FlightDto, 'id'> & {
        tripId: string;
    }): Promise<any>;
    findByTrip(tripId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFlightDto: Partial<FlightDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
