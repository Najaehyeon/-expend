import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";

export default function _Layout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#FF7F00",
            tabBarStyle: {
                    height: 80,
                    paddingTop: 6,
            },
        }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Octicons name={focused ? "home-fill" : "home"} size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='detail'
                options={{
                    title: "Details",
                    headerShown: false,
                    tabBarIcon: ({color}) => <AntDesign name="align-left" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}