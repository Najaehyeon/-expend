import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    const [aimMoney, setAimMoney] = useState(0);
    const [isAimWriting, setIsAimWriting] = useState(false);
    const [aimMoneyWriting, setAimMoneyWriting] = useState('');

    const getAim = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-aim');
            setAimMoney(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch(e) {
            setAimMoney(-1);
        }
    }

    useEffect(()=> {
        getAim();
    }, []);

    const storeAim = async (value) => {
        try {
            if (value === 0 || value === null) {
                return;
            }
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('my-aim', jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{flex: 1, paddingTop: insets.top, backgroundColor:"#F5F5F7"}}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.header}>
                <View style={styles.headerMonth}>
                    <TouchableOpacity>
                        <Feather name="chevron-left" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{year} {month}월</Text>
                    <TouchableOpacity>
                        <Feather name="chevron-right" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.weekAnalysis}
                >
                   <Feather name="activity" size={24} color="black" />
                </TouchableOpacity>
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
                            }}>월 최대 목표 지출</Text>
                            <TouchableOpacity
                                onPress={() => setIsAimWriting(true)}
                            >
                                <FontAwesome5 name="pen" size={14} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            fontSize: 32, fontWeight: "bold"
                        }}>{aimMoney === null ? '0' : aimMoney.toLocaleString('kr-KR')}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.floatingActionButton}
                        activeOpacity={0.6}
                        onPress={() => {
                            router.navigate('/spendingPost');
                        }}
                    >
                        <AntDesign name="plus" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {isAimWriting
                ? (
                    <View style={styles.aimWritingContainer}>
                        <View style={styles.aimWringTitleContainer}>
                            <Text style={styles.aimWringTitle}>월 최대 목표 지출</Text>
                        </View>
                        <View style={styles.aimWritingInputContainer}>
                            <TextInput
                                style={styles.aimWritingInput}
                                placeholder='목표 지출을 입력하세요.'
                                keyboardType='numeric'
                                onChangeText={(text)=> {
                                    setAimMoneyWriting(text);
                                }}
                                value={aimMoneyWriting}
                            />
                        </View>
                        <View style={styles.aimWritingButtons}>
                            <TouchableOpacity
                                style={styles.aimWritingCancelButton}
                                onPress={() => {
                                    setAimMoneyWriting('')
                                    setIsAimWriting(false)
                                }}
                            >
                                <Text>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.aimWritingConfirmButton}
                                onPress={() => {
                                    const aimValue = parseInt(aimMoneyWriting, 10)
                                    storeAim(aimValue);
                                    setAimMoneyWriting('');
                                    getAim();
                                    setIsAimWriting(false)
                                }}
                            >
                                <Text style={{color: "white"}}>저장</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                : (
                    null
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginTop: 20,
        marginHorizontal: 12,
        alignItems: 'flex-start',
        justifyContent: "space-between",
    },
    headerMonth: {
        flexDirection: "row",
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 8,
    },
    weekAnalysis: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
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
    },
    aimWritingContainer: {
        position: "absolute",
        bottom: "48%",
        left: "10%",
        width: "80%",
        height: "30%",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        elevation: 10,
    },
    aimWringTitleContainer: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    aimWringTitle: {
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
    },
    aimWritingInputContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    aimWritingInput: {
        backgroundColor: "#f5f5f7",
        width: "80%",
        height: "90%",
        borderRadius: 10,
        textAlign: "center",
    },
    aimWritingButtons: {
        flex: 5,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    aimWritingCancelButton: {
        backgroundColor: "#f5f5f7",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "38%",
        borderRadius: 10,
        marginRight: "4%",
    },
    aimWritingConfirmButton: {
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "38%",
        borderRadius: 10,
    }
})
