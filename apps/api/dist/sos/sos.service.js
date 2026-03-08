"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SosService = class SosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEvent(passengerId, data) {
        const passenger = await this.prisma.passenger.findUnique({ where: { id: passengerId } });
        if (!passenger)
            throw new common_1.NotFoundException(`Passenger ${passengerId} not found`);
        return this.prisma.sosEvent.create({
            data: {
                passengerId,
                latitude: data.latitude,
                longitude: data.longitude,
                status: 'OPEN',
            },
        });
    }
    async getActiveEventsForTrip(tripId) {
        return this.prisma.sosEvent.findMany({
            where: {
                status: 'OPEN',
                passenger: { tripId },
            },
            include: {
                passenger: {
                    include: { trip: true, hotel: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async resolveEvent(id) {
        return this.prisma.sosEvent.update({
            where: { id },
            data: {
                status: 'RESOLVED',
                resolvedAt: new Date(),
            },
        });
    }
};
exports.SosService = SosService;
exports.SosService = SosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SosService);
//# sourceMappingURL=sos.service.js.map