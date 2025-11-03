import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{flex: 1, marginTop: insets.top}}>
            <StatusBar barStyle={'dark-content'} />
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
                    <Text style={styles.aimAverageExpend}>하루 50,000원 이하 권장</Text>
                </View>
                <View style={styles.cylinderContainer}>
                    <View style={{flex:3, width: "100%", alignItems: "center"}}>
                        <View style={styles.cylinder}></View>
                        <View style={styles.aimExpendCylinder}>
                            <Text style={{
                                fontSize: 12,
                                top: -26,
                                left: -104,
                                fontWeight: "600",
                                textAlign: "center",
                            }}>11/18{'\n'}적정지출{'\n'}900,000</Text>
                        </View>
                        <View style={styles.expendCylinder}>
                            <Text style={{
                                fontSize: 12,
                                top: -15,
                                left: 104,
                                fontWeight: "600",
                                textAlign: "center",
                                color: "#0000bb"
                            }}>현재 지출{'\n'}820,700</Text>
                        </View>
                    </View>
                    <View style={{
                        flex:1,
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: 8,
                    }}>
                        <Text style={{
                            fontSize: 14, color: "#0000bb"
                        }}>오늘 지출</Text>
                        <Text style={{
                            fontSize: 32, fontWeight: "bold", color: "#0000bb"
                        }}>23,710</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.floatingActionButton}
                        activeOpacity={0.6}
                    >
                        <AntDesign name="plus" size={28} color="white" />
                    </TouchableOpacity>
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
        alignItems: "center",
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
    aimAverageExpend: {
        fontSize: 12,
    },
    cylinderContainer: {
        flex: 4,
        width: "100%",
    },
    cylinder: {
        position: "absolute",
        width: "40%",
        height: "100%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "white",
        bottom: 0,
    },
    expendCylinder: {
        position: "absolute",
        bottom: 0,
        width: "40%",
        height: "60%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "#0000bb",
    },
    aimExpendCylinder: {
        position: "absolute",
        bottom: 0,
        width: "40%",
        height: "64%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "white",
        borderTopWidth: 1,
    },
    floatingActionButton: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 50,
        backgroundColor: "black",
    }
})
