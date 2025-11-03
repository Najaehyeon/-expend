import { StatusBar, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle={'dark-content'} />
            <Text>Detail</Text>
        </SafeAreaView>
    )
}