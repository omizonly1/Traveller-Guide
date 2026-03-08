import { PrismaService } from '../prisma/prisma.service';
import { HotelDto } from '@repo/types';
export declare class HotelsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<HotelDto, 'id'> & {
        tripId: string;
    }): Promise<any>;
    findByTrip(tripId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Partial<HotelDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
