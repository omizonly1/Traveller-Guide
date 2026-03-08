import { SosService } from './sos.service';
import type { SosEventRequest } from '@repo/types';
export declare class SosController {
    private readonly sosService;
    constructor(sosService: SosService);
    triggerSos(passengerId: string, sosEvent: SosEventRequest): Promise<any>;
    getActiveEvents(tripId: string): Promise<any>;
    resolveEvent(eventId: string): Promise<any>;
}
