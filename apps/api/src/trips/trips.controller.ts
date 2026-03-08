import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TripsService } from './trips.service';
import type { TripDto } from '@repo/types';

@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Post()
    create(@Body() createTripDto: Omit<TripDto, 'id'>) {
        return this.tripsService.create(createTripDto);
    }

    @Get()
    findAll() {
        return this.tripsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tripsService.findOne(id);
    }

    @Get('code/:code')
    findByCode(@Param('code') code: string) {
        return this.tripsService.findByCode(code);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTripDto: Partial<TripDto>) {
        return this.tripsService.update(id, updateTripDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tripsService.remove(id);
    }
}
