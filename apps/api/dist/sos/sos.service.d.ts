import { PrismaService } from '../prisma/prisma.service';
import { SosEventRequest } from '@repo/types';
export declare class SosService {
    private prisma;
    constructor(prisma: PrismaService);
    createEvent(passengerId: string, data: SosEventRequest): Promise<any>;
    getActiveEventsForTrip(tripId: string): Promise<any>;
    resolveEvent(id: string): Promise<any>;
}
