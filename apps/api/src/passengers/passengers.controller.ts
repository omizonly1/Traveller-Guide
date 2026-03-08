import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import type { PassengerDto } from '@repo/types';

@Controller('passengers')
export class PassengersController {
    constructor(private readonly passengersService: PassengersService) { }

    @Post()
    create(@Body() createPassengerDto: Omit<PassengerDto, 'id'>) {
        return this.passengersService.create(createPassengerDto);
    }

    @Post('bulk')
    createBulk(@Body() passengers: Omit<PassengerDto, 'id'>[]) {
        return this.passengersService.createBulk(passengers);
    }

    @Get('trip/:tripId')
    findByTrip(@Param('tripId') tripId: string) {
        return this.passengersService.findByTrip(tripId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.passengersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePassengerDto: Partial<PassengerDto>) {
        return this.passengersService.update(id, updatePassengerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.passengersService.remove(id);
    }
}
