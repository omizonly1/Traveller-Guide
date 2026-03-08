import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TripDto } from '@repo/types';

@Injectable()
export class TripsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Omit<TripDto, 'id'>) {
        return this.prisma.trip.create({
            data: {
                code: data.code,
                departureCity: data.departureCity,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                leaders: data.leaders,
            },
        });
    }

    async findAll() {
        return this.prisma.trip.findMany({
            orderBy: { startDate: 'desc' },
        });
    }

    async findOne(id: string) {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
            include: {
                passengers: true,
                flights: true,
                hotels: true,
            },
        });

        if (!trip) throw new NotFoundException(`Trip with ID ${id} not found`);
        return trip;
    }

    async findByCode(code: string) {
        const trip = await this.prisma.trip.findUnique({
            where: { code },
            include: {
                flights: true,
                hotels: true,
            },
        });

        if (!trip) throw new NotFoundException(`Trip with code ${code} not found`);
        return trip;
    }

    async update(id: string, data: Partial<TripDto>) {
        return this.prisma.trip.update({
            where: { id },
            data: {
                ...data,
                ...(data.startDate && { startDate: new Date(data.startDate) }),
                ...(data.endDate && { endDate: new Date(data.endDate) }),
            },
        });
    }

    async remove(id: string) {
        return this.prisma.trip.delete({
            where: { id },
        });
    }
}
