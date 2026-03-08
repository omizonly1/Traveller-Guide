import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FlightDto } from '@repo/types';

@Injectable()
export class FlightsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Omit<FlightDto, 'id'> & { tripId: string }) {
        return this.prisma.flight.create({
            data: {
                ...data,
                departureTime: new Date(data.departureTime),
                arrivalTime: new Date(data.arrivalTime),
            },
        });
    }

    async findByTrip(tripId: string) {
        return this.prisma.flight.findMany({
            where: { tripId },
            orderBy: { departureTime: 'asc' },
        });
    }

    async findOne(id: string) {
        const flight = await this.prisma.flight.findUnique({ where: { id } });
        if (!flight) throw new NotFoundException(`Flight ${id} not found`);
        return flight;
    }

    async update(id: string, data: Partial<FlightDto>) {
        return this.prisma.flight.update({
            where: { id },
            data: {
                ...data,
                ...(data.departureTime && { departureTime: new Date(data.departureTime) }),
                ...(data.arrivalTime && { arrivalTime: new Date(data.arrivalTime) }),
            },
        });
    }

    async remove(id: string) {
        return this.prisma.flight.delete({ where: { id } });
    }
}
