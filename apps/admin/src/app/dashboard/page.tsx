"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertTriangle, Plane } from 'lucide-react';
import api from '@/lib/api';
import type { TripDto, PassengerDto } from '@repo/types';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardPage() {
    const [trips, setTrips] = useState<TripDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const { data } = await api.get('/trips');
                setTrips(data);
            } catch (e) {
                console.error('Failed to load trips', e);
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome to the Al Goni Tours management panel.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                            <Plane className="w-4 h-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{trips.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
                            <Users className="w-4 h-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">--</div>
                            <p className="text-xs text-gray-500">Across all trips</p>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-red-600">Active SOS Alerts</CardTitle>
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">0</div>
                            <p className="text-xs text-red-500">Lost pilgrims requiring help</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
