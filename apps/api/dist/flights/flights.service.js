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
exports.FlightsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FlightsService = class FlightsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.flight.create({
            data: {
                ...data,
                departureTime: new Date(data.departureTime),
                arrivalTime: new Date(data.arrivalTime),
            },
        });
    }
    async findByTrip(tripId) {
        return this.prisma.flight.findMany({
            where: { tripId },
            orderBy: { departureTime: 'asc' },
        });
    }
    async findOne(id) {
        const flight = await this.prisma.flight.findUnique({ where: { id } });
        if (!flight)
            throw new common_1.NotFoundException(`Flight ${id} not found`);
        return flight;
    }
    async update(id, data) {
        return this.prisma.flight.update({
            where: { id },
            data: {
                ...data,
                ...(data.departureTime && { departureTime: new Date(data.departureTime) }),
                ...(data.arrivalTime && { arrivalTime: new Date(data.arrivalTime) }),
            },
        });
    }
    async remove(id) {
        return this.prisma.flight.delete({ where: { id } });
    }
};
exports.FlightsService = FlightsService;
exports.FlightsService = FlightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlightsService);
//# sourceMappingURL=flights.service.js.map