import { HotelsService } from './hotels.service';
import type { HotelDto } from '@repo/types';
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    create(createHotelDto: Omit<HotelDto, 'id'> & {
        tripId: string;
    }): Promise<any>;
    findByTrip(tripId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateHotelDto: Partial<HotelDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
