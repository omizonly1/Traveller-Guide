import { PrismaService } from '../prisma/prisma.service';
import { FlightDto } from '@repo/types';
export declare class FlightsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<FlightDto, 'id'> & {
        tripId: string;
    }): Promise<any>;
    findByTrip(tripId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Partial<FlightDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
