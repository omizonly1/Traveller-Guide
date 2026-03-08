import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SosService } from './sos.service';
import type { SosEventRequest } from '@repo/types';

@Controller('sos')
export class SosController {
    constructor(private readonly sosService: SosService) { }

    @Post(':passengerId')
    triggerSos(
        @Param('passengerId') passengerId: string,
        @Body() sosEvent: SosEventRequest,
    ) {
        return this.sosService.createEvent(passengerId, sosEvent);
    }

    @Get('trip/:tripId')
    getActiveEvents(@Param('tripId') tripId: string) {
        return this.sosService.getActiveEventsForTrip(tripId);
    }

    @Put(':eventId/resolve')
    resolveEvent(@Param('eventId') eventId: string) {
        return this.sosService.resolveEvent(eventId);
    }
}
