import { TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import { PhoneCall } from 'lucide-react-native';
import api from '../lib/api';
import { loadOfflineData } from '../lib/storage';

export default function SosButton() {
    const [loading, setLoading] = useState(false);

    const handleSos = async () => {
        Alert.alert(
            "Emergency SOS",
            "Are you sure you want to send an emergency alert to your guide? Only use this if you are lost or in an emergency.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Send Alert",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            let { status } = await Location.requestForegroundPermissionsAsync();
                            if (status !== 'granted') {
                                Alert.alert('Permission Denied', 'Location is required to send SOS. Please enable it in settings.');
                                setLoading(false);
                                return;
                            }

                            let location = await Location.getCurrentPositionAsync({});
                            const data = await loadOfflineData();
                            const paxId = data?.passenger?.id;

                            if (paxId) {
                                await api.post('/sos', {
                                    passengerId: paxId,
                                    lat: location.coords.latitude,
                                    lng: location.coords.longitude,
                                });
                                Alert.alert("Success", "Your guide has been notified of your location.");
                            } else {
                                Alert.alert("Error", "You must be synced to a trip to send SOS.");
                            }
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Failed", "Could not send SOS. Check network connection.");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <TouchableOpacity
            style={styles.sosContainer}
            onPress={handleSos}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <>
                    <PhoneCall size={28} color="#ffffff" />
                    <Text style={styles.sosText}>SOS / HELP</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    sosContainer: {
        position: 'absolute',
        bottom: 90, // Above the tab bar
        right: 20,
        backgroundColor: '#dc2626', // Red-600
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        gap: 8,
    },
    sosText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
