import { Tabs } from 'expo-router';
import { UserSquare, Building2, Plane } from 'lucide-react-native';
import SosButton from '../../src/components/SosButton';

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#0ea5e9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Tabs.Screen
          name="id"
          options={{
            title: 'My ID',
            tabBarIcon: ({ color }) => <UserSquare size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="hotel"
          options={{
            title: 'My Hotel',
            tabBarIcon: ({ color }) => <Building2 size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="flights"
          options={{
            title: 'Flights',
            tabBarIcon: ({ color }) => <Plane size={24} color={color} />,
          }}
        />
      </Tabs>
      <SosButton />
    </>
  );
}
