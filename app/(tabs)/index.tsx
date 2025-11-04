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
                <View style={styles.todayContainer}>
                    <Text style={styles.todayTitle}>오늘 지출</Text>
                    <Text style={styles.todayExpend}>23,710</Text>
                    <Text style={styles.todayAverageExpend}>하루 50,000원 이하 권장</Text>
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
                    <View style={styles.aimContainer}>
                        <View style={styles.aimTitleContainer}>
                            <Text style={{
                                fontSize: 14, 
                                marginHorizontal: 6,
                            }}>목표 최대 지출</Text>
                            <FontAwesome5 name="pen" size={14} />
                        </View>
                        <Text style={{
                            fontSize: 32, fontWeight: "bold"
                        }}>1,500,000</Text>
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
    todayContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    todayTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0000bb",
    },
    todayExpend: {
        fontSize: 32,
        color: "#0000bb",
        fontWeight: "bold",
    },
    todayAverageExpend: {
        fontSize: 12,
        color: "#0000bb",
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
    aimContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        bottom: 8,
    },
    aimTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
