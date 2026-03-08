import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PassengerDto } from '@repo/types';

@Injectable()
export class PassengersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Omit<PassengerDto, 'id'>) {
        return this.prisma.passenger.create({ data });
    }

    async createBulk(data: Omit<PassengerDto, 'id'>[]) {
        return this.prisma.passenger.createMany({ data });
    }

    async findByTrip(tripId: string) {
        return this.prisma.passenger.findMany({
            where: { tripId },
            include: { hotel: true },
        });
    }

    async findOne(id: string) {
        const passenger = await this.prisma.passenger.findUnique({
            where: { id },
            include: { hotel: true, trip: true },
        });
        if (!passenger) throw new NotFoundException(`Passenger ${id} not found`);
        return passenger;
    }

    async update(id: string, data: Partial<PassengerDto>) {
        return this.prisma.passenger.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.passenger.delete({
            where: { id },
        });
    }
}
