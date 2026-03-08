import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../src/lib/api';
import { saveOfflineData, loadOfflineData } from '../src/lib/storage';

export default function LoginScreen() {
    const router = useRouter();
    const [passportRef, setPassportRef] = useState('');
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        // Check if we already have offline data on mount
        const checkExistingData = async () => {
            const data = await loadOfflineData();
            if (data && data.passenger) {
                router.replace('/(tabs)/id');
            } else {
                setLoading(false);
            }
        };
        checkExistingData();
    }, [router]);

    const handleSync = async () => {
        if (!passportRef) {
            Alert.alert('Error', 'Please enter your passport number or Umrah ID.');
            return;
        }

        setSyncing(true);
        try {
            // For this implementation, we query the backend for passenger details matching the passport
            // Assuming a simplified endpoint: /passengers/sync/:passportNo
            // In reality, this would be a secure token exchange.
            const { data } = await api.get(`/passengers/sync/${passportRef}`);

            const { passenger, trip, hotels, flights } = data;

            await saveOfflineData(passenger, trip, hotels, flights);

            Alert.alert('Success', 'Data synchronized successfully. You are now ready for your journey.');
            router.replace('/(tabs)/id');
        } catch (error) {
            console.error(error);
            Alert.alert('Sync Failed', 'Could not locate details. Please check your network connection and ID.');
        } finally {
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0ea5e9" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Al Goni Tours</Text>
                <Text style={styles.subtitle}>Pilgrim Assistant App</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Enter Passport Number / ID</Text>
                <TextInput
                    style={styles.input}
                    value={passportRef}
                    onChangeText={setPassportRef}
                    placeholder="e.g. A1234567"
                    autoCapitalize="characters"
                />

                <TouchableOpacity
                    style={[styles.button, syncing && styles.buttonDisabled]}
                    onPress={handleSync}
                    disabled={syncing}
                >
                    {syncing ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Download My Journey Data</Text>
                    )}
                </TouchableOpacity>
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
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 18,
        color: '#64748b',
        marginTop: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        padding: 16,
        fontSize: 18,
        marginBottom: 24,
        backgroundColor: '#f8fafc',
    },
    button: {
        backgroundColor: '#0ea5e9',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
