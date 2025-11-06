import { StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Stats() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{flex: 1, marginTop: insets.top}}>
            <StatusBar barStyle={'dark-content'} />
            <Text>Stats</Text>
        </View>
    )
}