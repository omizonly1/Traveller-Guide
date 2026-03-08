import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SosEventRequest } from '@repo/types';

@Injectable()
export class SosService {
    constructor(private prisma: PrismaService) { }

    async createEvent(passengerId: string, data: SosEventRequest) {
        const passenger = await this.prisma.passenger.findUnique({ where: { id: passengerId } });
        if (!passenger) throw new NotFoundException(`Passenger ${passengerId} not found`);

        return this.prisma.sosEvent.create({
            data: {
                passengerId,
                latitude: data.latitude,
                longitude: data.longitude,
                status: 'OPEN',
            },
        });
    }

    async getActiveEventsForTrip(tripId: string) {
        return this.prisma.sosEvent.findMany({
            where: {
                status: 'OPEN',
                passenger: { tripId },
            },
            include: {
                passenger: {
                    include: { trip: true, hotel: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async resolveEvent(id: string) {
        return this.prisma.sosEvent.update({
            where: { id },
            data: {
                status: 'RESOLVED',
                resolvedAt: new Date(),
            },
        });
    }
}
