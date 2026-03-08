import { PrismaService } from '../prisma/prisma.service';
import { PassengerDto } from '@repo/types';
export declare class PassengersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<PassengerDto, 'id'>): Promise<any>;
    createBulk(data: Omit<PassengerDto, 'id'>[]): Promise<any>;
    findByTrip(tripId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Partial<PassengerDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
