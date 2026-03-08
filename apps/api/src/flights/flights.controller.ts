import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FlightsService } from './flights.service';
import type { FlightDto } from '@repo/types';

@Controller('flights')
export class FlightsController {
    constructor(private readonly flightsService: FlightsService) { }

    @Post()
    create(@Body() createFlightDto: Omit<FlightDto, 'id'> & { tripId: string }) {
        return this.flightsService.create(createFlightDto);
    }

    @Get('trip/:tripId')
    findByTrip(@Param('tripId') tripId: string) {
        return this.flightsService.findByTrip(tripId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateFlightDto: Partial<FlightDto>) {
        return this.flightsService.update(id, updateFlightDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.flightsService.remove(id);
    }
}
