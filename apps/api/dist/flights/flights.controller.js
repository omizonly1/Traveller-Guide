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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsController = void 0;
const common_1 = require("@nestjs/common");
const flights_service_1 = require("./flights.service");
let FlightsController = class FlightsController {
    flightsService;
    constructor(flightsService) {
        this.flightsService = flightsService;
    }
    create(createFlightDto) {
        return this.flightsService.create(createFlightDto);
    }
    findByTrip(tripId) {
        return this.flightsService.findByTrip(tripId);
    }
    findOne(id) {
        return this.flightsService.findOne(id);
    }
    update(id, updateFlightDto) {
        return this.flightsService.update(id, updateFlightDto);
    }
    remove(id) {
        return this.flightsService.remove(id);
    }
};
exports.FlightsController = FlightsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FlightsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('trip/:tripId'),
    __param(0, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsController.prototype, "findByTrip", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FlightsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsController.prototype, "remove", null);
exports.FlightsController = FlightsController = __decorate([
    (0, common_1.Controller)('flights'),
    __metadata("design:paramtypes", [flights_service_1.FlightsService])
], FlightsController);
//# sourceMappingURL=flights.controller.js.map