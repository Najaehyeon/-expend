import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthDayCount = new Date(year, month, 0).getDate();
    const animatedValue = useRef(new Animated.Value(100)).current;
    
    const [currentDay, setCurrentDay] = useState(day);
    const [aimMoney, setAimMoney] = useState(0);
    const [isAimWriting, setIsAimWriting] = useState(false);
    const [aimMoneyWriting, setAimMoneyWriting] = useState('');
    const [todaySpentMoney, setTodaySpentMoney] = useState(0);
    const [monthSpentMoney, setMonthSpentMoney] = useState(0);

    const [aimCylinderHeight, setAimCylinderHeight] = useState(0);
    const [expendCylinderHeight, setExpendCylinderHeight] = useState(0);

    const [animationNumberValue, setAnimationNumberValue] = useState(0);

    const startAnimation = () => {
        animatedValue.setValue(100);
        setAnimationNumberValue(100);

        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const getAim = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-aim');
            const aim = jsonValue !== null ? JSON.parse(jsonValue) : 0;
            setAimMoney(aim);
            return aim;
        } catch(e) {
            setAimMoney(0);
            return 0;
        }
    }

    const storeAim = async (value) => {
        try {
            if (value === 0 || value === null) {
                return;
            }
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('my-aim', jsonValue);
        } catch (e) {
            return;
        }
    }

    const getTodaySpentMoney = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${year}-${month}-expense_details`);
            const currentData = jsonValue != null ? JSON.parse(jsonValue) : [];
            const todaySpent = currentData.filter(f => f.date == `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
            let today_total_price = 0
            for (let i = 0; i < todaySpent.length; i++){
                today_total_price += parseInt(todaySpent[i].price);
            }
            setTodaySpentMoney(today_total_price);
            return today_total_price;
        }
        catch(e) {
            setTodaySpentMoney(0);
            return 0;
        }
    }

    const getMonthSpentMoney = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${year}-${month}-expense_details`);
            const currentData = jsonValue != null ? JSON.parse(jsonValue) : [];
            const monthSpent = currentData.filter((value) => value.date.includes(`${year}-${String(month).padStart(2, "0")}`));
            let month_total_price = 0
            for (let i = 0; i < monthSpent.length; i++){
                month_total_price += parseInt(monthSpent[i].price);
            }
            setMonthSpentMoney(month_total_price);
            return month_total_price;
        }
        catch {
            setMonthSpentMoney(0);
            return 0;
        }
    }

    const fetchData = useCallback(async () => {
        const fetchedAimMoney = await getAim();
        const fetchedMonthSpentMoney = await getMonthSpentMoney();
        await getTodaySpentMoney();

        let newExpendCylinderHeight = 0;
        if (fetchedAimMoney > 0) { // aimMoney가 0이 아닐 때만 계산
            newExpendCylinderHeight = (fetchedMonthSpentMoney / fetchedAimMoney) * 100;
            if (newExpendCylinderHeight > 100) newExpendCylinderHeight = 100;
        }
        setExpendCylinderHeight(newExpendCylinderHeight);

        const newAimCylinderHeight = (day / monthDayCount) * 100;
        setAimCylinderHeight(newAimCylinderHeight);
    }, [year, month, day, monthDayCount]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            startAnimation();

            return () => {
                animatedValue.stopAnimation();
            }
        }, [fetchData, animatedValue])
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const newDay = now.getDate();
            if (newDay !== currentDay) {
                setCurrentDay(newDay); 
                getAim();
                getMonthSpentMoney();
                getTodaySpentMoney(); 
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [currentDay]);

    const cylinderAnimatedHeight = animatedValue.interpolate({
        inputRange: [1, 100],
        outputRange: [`${expendCylinderHeight}%`, `0%`],
        extrapolate: "clamp",
    })

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
                    <Text 
                        style={[
                            styles.todayTitle,
                            {color: todaySpentMoney > (aimMoney/monthDayCount*day) ? "#bb0000" : "#0000bb"}
                            ]}
                    >
                        오늘 지출
                    </Text>
                    <Text
                        style={[
                            styles.todayExpend,
                            {color: todaySpentMoney > (aimMoney/monthDayCount*day) ? "#bb0000" : "#0000bb"}
                        ]}
                    >
                        {todaySpentMoney.toLocaleString("kr-KR")}
                    </Text>
                    <Text
                        style={[
                            styles.todayAverageExpend,
                            {color: todaySpentMoney > (aimMoney/monthDayCount*day) ? "#bb0000" : "#0000bb"}
                        ]}
                    >
                            하루 {(aimMoney / monthDayCount).toLocaleString("kr-KR", {maximumFractionDigits: 0})}원 이하 권장
                    </Text>
                </View>
                <View style={styles.cylinderContainer}>
                    <View style={styles.cylinderWrapper}>
                        <View style={styles.cylinderBackground}>
                            <Animated.View
                                style={[
                                    styles.expendCylinder,
                                    {
                                        height: cylinderAnimatedHeight,
                                        backgroundColor: todaySpentMoney > (aimMoney/monthDayCount*day) ? "#bb0000" : "#0000bb"
                                    }
                                ]}
                            />
                            <View
                                style={[
                                    styles.aimExpendCylinder,
                                    {height: `${aimCylinderHeight}%`}
                                ]}
                            />
                        </View>
                        <View
                            style={[
                                styles.aimLabel,
                                {bottom: `${aimCylinderHeight}%`}
                            ]}
                        >
                            <Text style={styles.aimLabelText}>
                                {month}/{day}{'\n'}
                                적정지출{'\n'}
                                {Math.floor(aimMoney/monthDayCount*day).toLocaleString("kr-KR")}
                            </Text>
                        </View>
                        <Animated.View
                            style={[
                                styles.expendLabel,
                                {bottom: cylinderAnimatedHeight}
                            ]}
                        >
                            <Text
                                style={[
                                    styles.expendLabelText,
                                    {color: todaySpentMoney > (aimMoney/monthDayCount*day) ? "#bb0000" : "#0000bb"}
                                ]}
                            >
                                현재 지출{'\n'}
                                {monthSpentMoney.toLocaleString("kr-KR")}
                            </Text>
                        </Animated.View>
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
                            navigation.navigate('spendingPost');
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
                                    startAnimation();
                                    fetchData();
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
    },
    todayExpend: {
        fontSize: 32,
        fontWeight: "bold",
    },
    todayAverageExpend: {
        fontSize: 12,
    },
    cylinderContainer: {
        flex: 4,
        width: "100%",
    },
    cylinderWrapper: {
        flex: 3, 
        width: "100%", 
        alignItems: "center",
    },
    cylinderBackground: {
        position: "absolute",
        width: "40%",
        height: "100%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "white",
        bottom: 0,
        overflow: 'hidden',
    },
    expendCylinder: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    aimExpendCylinder: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderTopWidth: 1.4,
    },
    aimLabel: {
        position: 'absolute',
        left: '15%',
        transform: [{translateY: 20}],
        alignItems: 'center',
    },
    aimLabelText: {
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
    },
    expendLabel: {
        position: 'absolute',
        right: '15%',
        transform: [{translateY: 12}],
        alignItems: 'center',
    },
    expendLabelText: {
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
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
        flex: 3,
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
        height: "80%",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 14,
    },
    aimWritingButtons: {
        flex: 4,
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
