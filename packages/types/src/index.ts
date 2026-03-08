// Shared API Types

export interface LoginRequest {
    codeOrId: string;
}

export interface LoginResponse {
    token: string;
    passenger: PassengerDto;
}

export interface TripDto {
    id: string;
    code: string;
    departureCity: string;
    startDate: string;
    endDate: string;
    leaders: string[];
}

export interface PassengerDto {
    id: string;
    tripId: string;
    firstName: string;
    lastName: string;
    passportNo: string;
    visaNo?: string;
    photoUrl?: string;
    contactPhone?: string;
}

export interface FlightDto {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    departureTerm?: string;
    arrivalTerm?: string;
    gateNumber?: string;
}

export interface HotelDto {
    id: string;
    nameEnglish: string;
    nameArabic: string;
    addressArabic: string;
    latitude?: number;
    longitude?: number;
}

export interface SosEventRequest {
    latitude: number;
    longitude: number;
}
