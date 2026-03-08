import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TripDto, PassengerDto, HotelDto, FlightDto } from '@repo/types';

const STORAGE_KEYS = {
    PASSENGER: '@umrah_passenger',
    TRIP: '@umrah_trip',
    HOTELS: '@umrah_hotels',
    FLIGHTS: '@umrah_flights',
};

export const saveOfflineData = async (
    passenger: PassengerDto,
    trip: TripDto,
    hotels: HotelDto[],
    flights: FlightDto[]
) => {
    try {
        await Promise.all([
            AsyncStorage.setItem(STORAGE_KEYS.PASSENGER, JSON.stringify(passenger)),
            AsyncStorage.setItem(STORAGE_KEYS.TRIP, JSON.stringify(trip)),
            AsyncStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotels)),
            AsyncStorage.setItem(STORAGE_KEYS.FLIGHTS, JSON.stringify(flights)),
        ]);
    } catch (e) {
        console.error('Error saving data offline', e);
    }
};

export const loadOfflineData = async () => {
    try {
        const keys = Object.values(STORAGE_KEYS);
        const results = await Promise.all(keys.map(key => AsyncStorage.getItem(key)));
        const data: Record<string, any> = {};

        keys.forEach((key, index) => {
            const value = results[index];
            if (value) {
                data[key] = JSON.parse(value);
            }
        });

        return {
            passenger: data[STORAGE_KEYS.PASSENGER] as PassengerDto | null,
            trip: data[STORAGE_KEYS.TRIP] as TripDto | null,
            hotels: data[STORAGE_KEYS.HOTELS] as HotelDto[] | null,
            flights: data[STORAGE_KEYS.FLIGHTS] as FlightDto[] | null,
        };
    } catch (e) {
        console.error('Error loading data offline', e);
        return null;
    }
};

export const clearOfflineData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('Error clearing offline data', e);
    }
};
