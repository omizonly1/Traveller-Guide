import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { loadOfflineData } from '../../src/lib/storage';
import type { HotelDto } from '@repo/types';

export default function HotelScreen() {
    const [hotels, setHotels] = useState<HotelDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await loadOfflineData();
            if (data?.hotels) {
                setHotels(data.hotels);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#0ea5e9" /></View>;
    }

    if (hotels.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>No hotels assigned for your trip yet.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
            {hotels.map((hotel) => (
                <View key={hotel.id} style={styles.card}>
                    <Text style={styles.cityBadge}>HOTEL</Text>

                    <Text style={styles.hotelNameEn}>{hotel.nameEnglish}</Text>
                    <Text style={styles.hotelNameAr}>{hotel.nameArabic}</Text>

                    <View style={styles.divider} />

                    <View style={styles.addressRow}>
                        <MapPin size={24} color="#0ea5e9" />
                        <Text style={styles.addressText}>{hotel.addressArabic}</Text>
                    </View>

                    <View style={styles.datesRow}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Check-In</Text>
                            <Text style={styles.dateValue}>TBD</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Check-Out</Text>
                            <Text style={styles.dateValue}>TBD</Text>
                        </View>
                    </View>
                </View>
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
    cityBadge: {
        backgroundColor: '#e0f2fe',
        color: '#0284c7',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    hotelNameEn: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    hotelNameAr: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginTop: 8,
        textAlign: 'right', // Critical for Arabic
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 16,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 16,
    },
    addressText: {
        flex: 1,
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
    },
    datesRow: {
        flexDirection: 'row',
        gap: 16,
    },
    dateBox: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    dateLabel: {
        fontSize: 12,
        color: '#64748b',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0f172a',
    }
});
