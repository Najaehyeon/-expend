import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{flex: 1, marginTop: insets.top}}>
            <View style={styles.header}>
                <Feather name="chevron-left" size={28} color="black" />
                <Text style={styles.headerText}>2025 11월</Text>
                <Feather name="chevron-right" size={28} color="black" />
            </View>
            <View style={styles.content}>
                <View style={styles.aimContainer}>
                    <View style={styles.aimTitleContainer}>
                        <Text style={styles.aimTitle}>목표 지출</Text>
                        <FontAwesome5 name="pen" size={14} color="black" />
                    </View>
                    <Text style={styles.aimExpend}>1,500,000</Text>
                </View>
                <View style={styles.cylinderContainer}>
                    <View style={{flex:6, width: "100%", alignItems: "center"}}>
                        <View style={styles.cylinder}></View>
                        <View style={styles.aimExpendCylinder}>
                            <Text style={{
                                fontSize: 12,
                                top: -26,
                                left: -108,
                                fontWeight: "600",
                                textAlign: "center",
                            }}>11/18{'\n'}적정지출{'\n'}900,000</Text>
                        </View>
                        <View style={styles.expendCylinder}>
                            <Text style={{
                                fontSize: 12,
                                top: -15,
                                left: 108,
                                fontWeight: "600",
                                textAlign: "center",
                                color: "#FF7F00"
                            }}>현재 지출{'\n'}820,700</Text>
                        </View>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 12,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 8,
    },
    content: {
        flex: 1,
        alignItems: "center",
    },
    aimContainer: {
        flex: 1,
        justifyContent: "center",
    },
    aimTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    aimTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginHorizontal: 6,
    },
    aimExpend: {
        fontSize: 28,
        fontWeight: "bold",
    },
    cylinderContainer: {
        flex: 3,
        width: "100%",
    },
    cylinder: {
        position: "absolute",
        width: "42%",
        height: "100%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "white",
        bottom: 0,
    },
    expendCylinder: {
        position: "absolute",
        bottom: 0,
        width: "42%",
        height: "60%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#FF7F00",
    },
    aimExpendCylinder: {
        position: "absolute",
        bottom: 0,
        width: "42%",
        height: "64%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "white",
        borderTopWidth: 1,
    }
})