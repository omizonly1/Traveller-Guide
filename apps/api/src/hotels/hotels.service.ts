import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HotelDto } from '@repo/types';

@Injectable()
export class HotelsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Omit<HotelDto, 'id'> & { tripId: string }) {
        return this.prisma.hotel.create({ data });
    }

    async findByTrip(tripId: string) {
        return this.prisma.hotel.findMany({ where: { tripId } });
    }

    async findOne(id: string) {
        const hotel = await this.prisma.hotel.findUnique({ where: { id } });
        if (!hotel) throw new NotFoundException(`Hotel ${id} not found`);
        return hotel;
    }

    async update(id: string, data: Partial<HotelDto>) {
        return this.prisma.hotel.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.hotel.delete({ where: { id } });
    }
}
