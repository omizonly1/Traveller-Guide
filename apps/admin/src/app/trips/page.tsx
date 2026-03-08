"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/layout/Sidebar';
import api from '@/lib/api';
import type { TripDto } from '@repo/types';
import Link from 'next/link';
import { format } from 'date-fns';

export default function TripsPage() {
    const [trips, setTrips] = useState<TripDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTripCode, setNewTripCode] = useState('');
    const [newTripCity, setNewTripCity] = useState('');

    const fetchTrips = async () => {
        try {
            const { data } = await api.get('/trips');
            setTrips(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/trips', {
                code: newTripCode,
                departureCity: newTripCity,
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                leaders: [],
            });
            setNewTripCode('');
            setNewTripCity('');
            fetchTrips();
        } catch (e) {
            console.error(e);
            alert('Failed to create trip');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Trips</h1>
                        <p className="text-gray-500">Manage all Umrah groups.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Create New Trip</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="flex gap-4 items-end">
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium">Trip Code</label>
                                <Input
                                    required
                                    placeholder="e.g. UMRAH-OCT-26"
                                    value={newTripCode}
                                    onChange={(e) => setNewTripCode(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium">Departure City</label>
                                <Input
                                    required
                                    placeholder="e.g. Dhaka"
                                    value={newTripCity}
                                    onChange={(e) => setNewTripCity(e.target.value)}
                                />
                            </div>
                            <Button type="submit">Create Trip</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Trips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Loading trips...</p>
                        ) : trips.length === 0 ? (
                            <p className="text-gray-500">No trips found.</p>
                        ) : (
                            <div className="border rounded-md">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 font-medium">
                                        <tr>
                                            <th className="px-4 py-3 border-b">Code</th>
                                            <th className="px-4 py-3 border-b">Departure City</th>
                                            <th className="px-4 py-3 border-b">Start Date</th>
                                            <th className="px-4 py-3 border-b text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trips.map((trip) => (
                                            <tr key={trip.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{trip.code}</td>
                                                <td className="px-4 py-3">{trip.departureCity}</td>
                                                <td className="px-4 py-3">{format(new Date(trip.startDate), 'MMM dd, yyyy')}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <Link href={`/trips/${trip.id}`} className="text-blue-600 hover:underline">
                                                        Manage
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
