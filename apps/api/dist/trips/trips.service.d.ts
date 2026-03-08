import { PrismaService } from '../prisma/prisma.service';
import { TripDto } from '@repo/types';
export declare class TripsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<TripDto, 'id'>): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findByCode(code: string): Promise<any>;
    update(id: string, data: Partial<TripDto>): Promise<any>;
    remove(id: string): Promise<any>;
}
