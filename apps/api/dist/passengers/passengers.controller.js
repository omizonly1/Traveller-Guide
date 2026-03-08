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
exports.PassengersController = void 0;
const common_1 = require("@nestjs/common");
const passengers_service_1 = require("./passengers.service");
let PassengersController = class PassengersController {
    passengersService;
    constructor(passengersService) {
        this.passengersService = passengersService;
    }
    create(createPassengerDto) {
        return this.passengersService.create(createPassengerDto);
    }
    createBulk(passengers) {
        return this.passengersService.createBulk(passengers);
    }
    findByTrip(tripId) {
        return this.passengersService.findByTrip(tripId);
    }
    findOne(id) {
        return this.passengersService.findOne(id);
    }
    update(id, updatePassengerDto) {
        return this.passengersService.update(id, updatePassengerDto);
    }
    remove(id) {
        return this.passengersService.remove(id);
    }
};
exports.PassengersController = PassengersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Get)('trip/:tripId'),
    __param(0, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "findByTrip", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PassengersController.prototype, "remove", null);
exports.PassengersController = PassengersController = __decorate([
    (0, common_1.Controller)('passengers'),
    __metadata("design:paramtypes", [passengers_service_1.PassengersService])
], PassengersController);
//# sourceMappingURL=passengers.controller.js.map