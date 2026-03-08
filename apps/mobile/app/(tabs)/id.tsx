import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { loadOfflineData } from '../../src/lib/storage';
import type { PassengerDto } from '@repo/types';

export default function IDCardScreen() {
    const [passenger, setPassenger] = useState<PassengerDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await loadOfflineData();
            if (data?.passenger) {
                setPassenger(data.passenger);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#0ea5e9" /></View>;
    }

    if (!passenger) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>No passenger data found. Please sync.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Text style={styles.agencyName}>Al Goni Tours & Travels</Text>
                    <Text style={styles.yearRow}>UMRAH 2026</Text>
                </View>

                <View style={styles.contentRow}>
                    <View style={styles.detailsCol}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value} numberOfLines={2}>
                            {passenger.firstName} {passenger.lastName}
                        </Text>

                        <Text style={styles.label}>Passport Number</Text>
                        <Text style={styles.value}>{passenger.passportNo}</Text>

                        <Text style={styles.label}>Visa Number</Text>
                        <Text style={styles.value}>{passenger.visaNo || 'Pending'}</Text>

                        <Text style={[styles.label, { marginTop: 12 }]}>Emergency Guide</Text>
                        <Text style={styles.value}>+966 50 123 4567</Text>
                    </View>

                    <View style={styles.qrCol}>
                        <View style={styles.qrFrame}>
                            <QRCode
                                value={`UMRAH-QR:${passenger.id}`}
                                size={120}
                                backgroundColor="white"
                                color="black"
                            />
                        </View>
                        <Text style={styles.qrScanText}>SCAN IF LOST</Text>
                    </View>
                </View>
            </View>
        </View>
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
        paddingTop: 32,
    },
    errorText: {
        fontSize: 18,
        color: '#dc2626',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    headerRow: {
        borderBottomWidth: 2,
        borderBottomColor: '#0ea5e9',
        paddingBottom: 16,
        marginBottom: 20,
        alignItems: 'center',
    },
    agencyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'center',
    },
    yearRow: {
        fontSize: 16,
        color: '#0ea5e9',
        fontWeight: 'bold',
        marginTop: 4,
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsCol: {
        flex: 1,
        paddingRight: 16,
    },
    label: {
        fontSize: 14,
        color: '#64748b',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 2,
        marginTop: 12,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    qrCol: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrFrame: {
        padding: 8,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderRadius: 8,
    },
    qrScanText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ef4444',
        marginTop: 8,
        textAlign: 'center',
    }
});
