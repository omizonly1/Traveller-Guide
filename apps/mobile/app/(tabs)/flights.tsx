import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { PlaneTakeoff, PlaneLanding } from 'lucide-react-native';
import { loadOfflineData } from '../../src/lib/storage';
import type { FlightDto } from '@repo/types';

export default function FlightsScreen() {
    const [flights, setFlights] = useState<FlightDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await loadOfflineData();
            if (data?.flights) {
                setFlights(data.flights);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#0ea5e9" /></View>;
    }

    if (flights.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>No flights assigned for your trip yet.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
            {flights.map((flight) => (
                <View key={flight.id} style={styles.card}>
                    <View style={styles.headerRow}>
                        <Text style={styles.airline}>{flight.airline}</Text>
                        <Text style={styles.flightno}>{flight.flightNumber}</Text>
                    </View>

                    <View style={styles.routeContainer}>
                        <View style={styles.portBox}>
                            <PlaneTakeoff size={24} color="#0ea5e9" />
                            <Text style={styles.portCode}>DEP</Text>
                            <Text style={styles.timeStr}>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            <Text style={styles.dateStr}>{new Date(flight.departureTime).toLocaleDateString()}</Text>
                        </View>

                        <View style={styles.lineBox}>
                            <View style={styles.line} />
                        </View>

                        <View style={styles.portBox}>
                            <PlaneLanding size={24} color="#0ea5e9" />
                            <Text style={styles.portCode}>ARR</Text>
                            <Text style={styles.timeStr}>{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            <Text style={styles.dateStr}>{new Date(flight.arrivalTime).toLocaleDateString()}</Text>
                        </View>
                    </View>

                    {flight.departureTerm && (
                        <View style={styles.footerRow}>
                            <Text style={styles.gateLabel}>TERMINAL / GATE</Text>
                            <Text style={styles.gateValue}>{flight.departureTerm} {flight.gateNumber ? `/ ${flight.gateNumber}` : ''}</Text>
                        </View>
                    )}  </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 16,
    },
    emptyText: {
        fontSize: 18,
        color: '#64748b',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    airline: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    flightno: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0ea5e9',
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    portBox: {
        alignItems: 'center',
        flex: 1,
    },
    lineBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    line: {
        height: 2,
        backgroundColor: '#cbd5e1',
        width: '100%',
    },
    portCode: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginTop: 8,
    },
    timeStr: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
        marginTop: 4,
    },
    dateStr: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 2,
    },
    footerRow: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gateLabel: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: 'bold',
    },
    gateValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#dc2626', // Red for visibility
    }
});
