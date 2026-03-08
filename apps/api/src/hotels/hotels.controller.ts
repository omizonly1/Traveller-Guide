import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import type { HotelDto } from '@repo/types';

@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) { }

    @Post()
    create(@Body() createHotelDto: Omit<HotelDto, 'id'> & { tripId: string }) {
        return this.hotelsService.create(createHotelDto);
    }

    @Get('trip/:tripId')
    findByTrip(@Param('tripId') tripId: string) {
        return this.hotelsService.findByTrip(tripId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.hotelsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateHotelDto: Partial<HotelDto>) {
        return this.hotelsService.update(id, updateHotelDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.hotelsService.remove(id);
    }
}
