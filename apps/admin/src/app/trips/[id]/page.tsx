"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/layout/Sidebar';
import IDCardGenerator from '@/components/IDCardGenerator';
import api from '@/lib/api';
import type { TripDto, PassengerDto } from '@repo/types';

export default function TripDetailsPage() {
    const { id } = useParams();
    const [trip, setTrip] = useState<TripDto | null>(null);
    const [passengers, setPassengers] = useState<PassengerDto[]>([]);
    const [loading, setLoading] = useState(true);

    // New passenger quick form
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passportNo, setPassportNo] = useState('');

    const fetchTripData = async () => {
        try {
            const [tripRes, paxRes] = await Promise.all([
                api.get(`/trips/${id}`),
                api.get(`/passengers/trip/${id}`)
            ]);
            setTrip(tripRes.data);
            setPassengers(paxRes.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTripData();
    }, [id]);

    const handleAddPassenger = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/passengers', {
                tripId: id as string,
                firstName,
                lastName,
                passportNo,
            });
            setFirstName('');
            setLastName('');
            setPassportNo('');
            fetchTripData();
        } catch (e) {
            console.error(e);
            alert('Failed to add passenger');
        }
    };

    if (loading) return <div className="p-8">Loading trip details...</div>;
    if (!trip) return <div className="p-8 text-red-500">Trip not found</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Trip: {trip.code}</h1>
                    <p className="text-gray-500">{trip.departureCity} • Passengers: {passengers.length}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Add Passenger</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddPassenger} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input required value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input required value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Passport No.</label>
                                        <Input required value={passportNo} onChange={e => setPassportNo(e.target.value)} />
                                    </div>
                                    <Button type="submit" className="w-full">Add Passenger</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Bulk Import</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">Upload an Excel file to import multiple passengers at once.</p>
                                <Button variant="outline" className="w-full">Upload Excel</Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Passenger Manifest</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {passengers.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No passengers registered yet.</p>
                                ) : (
                                    <div className="border rounded-md overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-100 font-medium">
                                                <tr>
                                                    <th className="px-4 py-3 border-b">Name</th>
                                                    <th className="px-4 py-3 border-b">Passport No</th>
                                                    <th className="px-4 py-3 border-b">Visa No</th>
                                                    <th className="px-4 py-3 border-b text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {passengers.map((pax) => (
                                                    <tr key={pax.id} className="border-b hover:bg-gray-50">
                                                        <td className="px-4 py-3 font-medium">{pax.firstName} {pax.lastName}</td>
                                                        <td className="px-4 py-3">{pax.passportNo}</td>
                                                        <td className="px-4 py-3 text-gray-500">{pax.visaNo || 'Pending'}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <button className="text-red-600 hover:underline text-xs">Remove</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Generate physical ID Cards</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <IDCardGenerator passengers={passengers} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
