import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpendingPost() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [catergorySelectActivated, setCatergorySelectActivated] = useState(false);
    const [categories, setCategories] = useState(['식비', '자기계발']);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={{flex: 1, marginTop: insets.top + 10, backgroundColor: "#F5F5F7"}}>
            <StatusBar
                barStyle={'dark-content'}
            />
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.headerBackButton}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Feather name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: "600"}}>지출 내역 작성</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text>날짜</Text>
                    <TouchableOpacity
                        style={styles.dateSelectContainer}
                        activeOpacity={0.6}
                        onPress={showDatepicker}
                    >
                        <Text>{`${year}-${String(month).padStart(2, "0")}-${String(day  ).padStart(2, "0")} ${daysOfWeek[dayOfWeek]}`}</Text>
                        <MaterialIcons name="date-range" size={24} color="#B1B1B1" />
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </View>
                <View style={styles.categoryContainer}>
                    <Text>카테고리</Text>
                    <TouchableOpacity
                        style={styles.categorySelectContainer}
                        activeOpacity={0.6}
                        onPress={() => {setCatergorySelectActivated(true)}}
                    >
                        <Text style={styles.categorySelectText}>카테고리를 선택해주세요.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <Text>상세 내용</Text>
                    <TextInput
                        style={styles.detailSelectContainer}
                        placeholder='상세 내용을 입력해주세요.'
                        placeholderTextColor="#b1b1b1"
                        selectionColor={"#000"}
                    />
                </View>
                <View style={styles.priceContainer}>
                    <Text>금액</Text>
                    <TextInput
                        style={styles.priceSelectContainer}
                        placeholder='금액을 입력해주세요.'
                        placeholderTextColor="#b1b1b1"
                        keyboardType='numeric'
                    />
                </View>
                <TouchableOpacity
                    style={styles.saveButtonContainer}
                    activeOpacity={0.7}
                >
                        <Text style={styles.saveButtonText}>저장하기</Text>
                </TouchableOpacity>
            </View>

            {/* 카테고리 선택 창 */}
            {
                catergorySelectActivated
                    ? (
                        <View style={styles.categorySelectActiveContainer}>
                            <View style={styles.categorySelectActiveShadow}/>
                            <View style={styles.categorySelectActiveBox}>
                                <View style={styles.categorySelectActiveHeader}>
                                    <Text style={{fontSize: 20, fontWeight: "600"}}>카테고리 선택</Text>
                                    <TouchableOpacity
                                        onPress={() => setCatergorySelectActivated(false)}
                                    >
                                        <AntDesign name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.categoryListContainer}>
                                {
                                    categories.map((category, index) => (
                                            <View
                                                key={index}
                                                style={styles.categoryItem}
                                            >
                                                <Text>{category}</Text>
                                            </View>
                                    ))
                                }
                                    <TouchableOpacity
                                        style={styles.categoryItem}
                                        activeOpacity={0.6}
                                        onPress={() => setCategories([...categories, '공과금'])}
                                    >
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                    : null
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 24,
        backgroundColor: "#F5F5F7",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerBackButton: {
        left: -10,
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    dateContainer: {
        marginBottom: 12,
    },
    dateSelectContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 6,
        height: 42,
        borderRadius: 12,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    categoryContainer: {
        marginBottom: 12,
    },
    categorySelectContainer: {
        backgroundColor: "white",
        marginTop: 6,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 16,
    },
    categorySelectText: {
        color: "#b1b1b1"
    },
    detailContainer: {
        marginBottom: 12,
    },
    detailSelectContainer: {
        backgroundColor: "white",
        marginTop: 6,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        color: "black"
    },
    priceContainer: {
        marginBottom: 12,
    },
    priceSelectContainer: {
        backgroundColor: "white",
        marginTop: 6,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        color: "black"
    },
    saveButtonContainer: {
        backgroundColor: "black",
        marginTop: 6,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
    },
    categorySelectActiveContainer: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    categorySelectActiveShadow: {
        backgroundColor: "grey",
        opacity: 0.5,
        bottom: 0,
        position: "absolute",
        width: "100%",
        height: "120%",
    },
    categorySelectActiveBox: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        width: "100%",
        height: "68%",
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
    },
    categorySelectActiveHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 24,
    },
    categoryListContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
    },
    categoryItem: {
        width: '28%',
        height: 50,
        marginRight: "5%",
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }
})