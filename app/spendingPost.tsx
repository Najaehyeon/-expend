import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpendingPost() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [catergorySelectActivated, setCatergorySelectActivated] = useState(false);
    const [categories, setCategories] = useState([]);
    const [plusCategory, setPlusCategory] = useState(false);
    const [writingPlusCategory, setWritingPlusCategory] = useState('');
    const [isActiveCategoryDelete, setIsActiveCategoryDelete] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDetail, setSelectedDetail] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    const [expensesOfTheMonthData, setExpensesOfTheMonthData] = useState([]);

    const [showBlank, setShowBlank] = useState(false);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const datePick = (selectedDate) => {
        setShow(false);
        setDate(new Date(selectedDate));
    };

    const showDatepicker = () => {
        if (show) return setShow(false);
        setShow(true);
    };

    const storeCategories = async (plusCategories) => {
        try {
            const jsonValue = JSON.stringify(plusCategories);
            await AsyncStorage.setItem('my_all_categories', jsonValue);
        } catch(e) {
            // save error
        }
    }

    const getAllCategories = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my_all_categories');
            jsonValue != null ? setCategories(JSON.parse(jsonValue)) : null
        } catch(e) {
            // read error
        }
    }

    const storeExpendDetails = async (selectedDate, selectedCategory, selectedDetail, selectedPrice) => {
        try {
            if (selectedCategory === '' || selectedDetail === '' || selectedPrice === '') {
                setShowBlank(true)
                return;
            };
            const storageKey = `${year}-${month}-expense_details`;
            const jsonValue = await AsyncStorage.getItem(storageKey);
            const currentData = jsonValue != null ? JSON.parse(jsonValue) : [];
            
            const newExpense = {
                date: selectedDate,
                category: selectedCategory,
                detail: selectedDetail,
                price: selectedPrice,
            };
            const updatedExpenseDetails = [
                ...currentData,
                newExpense,
            ];
            
            const updatedJsonValue = JSON.stringify(updatedExpenseDetails);
            await AsyncStorage.setItem(storageKey, updatedJsonValue);
            navigation.goBack();
        } catch(e) {
            
        }
    }

    const getExpendDetails = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${year}-${month}-expense_details`);
            jsonValue != null ? setExpensesOfTheMonthData(JSON.parse(jsonValue)) : null
        } catch(e) {
            
        }
    }

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem(`${year}-${month}-expense_details`)
        } catch(e) {
            // remove error
        }
        console.log('Removed.');
    }

    useEffect(() => {
        getAllCategories();
        getExpendDetails();
        setSelectedDate(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
    }, [year, month, day])

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
                        <Text>{`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${daysOfWeek[dayOfWeek]}`}</Text>
                        <MaterialIcons name="date-range" size={24} color="#B1B1B1" />
                    </TouchableOpacity>
                    {show && (
                        <Calendar
                            style={styles.dateSelectCalendar}
                            current={`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
                            markedDates={{
                                [`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`]: {selected: true, disableTouchEvent: true, selectedColor: 'black'}
                            }}
                            onDayPress={(day) => {
                                datePick(day.timestamp)
                                setSelectedDate(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`)
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: '#000',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                            }}
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
                        {
                            selectedCategory === '' 
                                ? <Text style={{color: "#b1b1b1"}}>카테고리를 선택해주세요.</Text>
                                : <Text>{selectedCategory}</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <Text>상세 내용</Text>
                    <TextInput
                        style={styles.detailSelectContainer}
                        placeholder='상세 내용을 입력해주세요.'
                        placeholderTextColor="#b1b1b1"
                        selectionColor={"#000"}
                        onChangeText={(text) => setSelectedDetail(text)}
                        value={selectedDetail}
                    />
                </View>
                <View style={styles.priceContainer}>
                    <Text>금액</Text>
                    <TextInput
                        style={styles.priceSelectContainer}
                        placeholder='금액을 입력해주세요.'
                        placeholderTextColor="#b1b1b1"
                        keyboardType='numeric'
                        onChangeText={(price) => setSelectedPrice(price)}
                        value={selectedPrice}
                    />
                </View>
                {showBlank ? (
                        <View>
                            <Text style={{color: "red"}}>*빈 칸을 모두 작성해주세요.</Text>
                        </View>
                    )
                    : null
                }
                <TouchableOpacity
                    style={styles.saveButtonContainer}
                    activeOpacity={0.7}
                    onPress={() => {
                        storeExpendDetails(selectedDate, selectedCategory, selectedDetail, selectedPrice)
                    }}
                >
                        <Text style={styles.saveButtonText}>저장하기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.saveButtonContainer, {backgroundColor: "#00adf5"}]}
                    activeOpacity={0.7}
                    onPress={() => {
                        removeValue();
                    }}
                >
                        <Text style={styles.saveButtonText}>테스트용 데이터 삭제</Text>
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
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.categoryItem}
                                                activeOpacity={0.6}
                                                onPress={() => {
                                                    setSelectedCategory(category)
                                                    setCatergorySelectActivated(false)
                                                }}
                                            >
                                                <Text>{category}</Text>
                                                {
                                                    isActiveCategoryDelete
                                                        ? (
                                                            <TouchableOpacity
                                                                style={styles.categoryItemDeleteButton}
                                                                activeOpacity={0.5}
                                                                onPress={() => {
                                                                    const updatedCategories = categories.filter((_, i) => i !== index);
                                                                    setCategories(updatedCategories);
                                                                    storeCategories(updatedCategories);
                                                                }}
                                                            >
                                                                <AntDesign name="close" size={12} color="white" />
                                                            </TouchableOpacity>
                                                        )
                                                        : null
                                                }
                                            </TouchableOpacity>
                                    ))
                                }
                                    {
                                        isActiveCategoryDelete || categories.length > 14
                                             ? null
                                             : (
                                                <TouchableOpacity
                                                    style={styles.categoryItem}
                                                    activeOpacity={0.5}
                                                    onPress={() => setPlusCategory(true)}
                                                >
                                                    <AntDesign name="plus" size={20} color="black" />
                                                </TouchableOpacity>
                                             )
                                    }
                                </View>
                                <View style={styles.categortDeleteActiveButton}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            isActiveCategoryDelete
                                                ? setIsActiveCategoryDelete(false)
                                                : setIsActiveCategoryDelete(true)
                                        }}
                                    >
                                        {
                                            isActiveCategoryDelete
                                                ? <AntDesign name="undo" size={24} color="black" />
                                                : <Feather name="trash-2" size={24} color="black" />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {plusCategory 
                                ? (
                                    <View style={styles.categoryPlusContainer}>
                                        <View style={styles.categoryPlusTitleContainer}>
                                            <Text style={styles.categoryPlusTitle}>카테고리 작성</Text>
                                        </View>
                                        <View style={styles.categoryPlusInputContainer}>
                                            <TextInput
                                                style={styles.categoryPlusInput}
                                                onChangeText={(text) => setWritingPlusCategory(text)}
                                                value={writingPlusCategory}
                                                placeholder='추가할 카테고리를 입력해주세요.'
                                            />
                                        </View>
                                        <View style={styles.categoryPlusButtons}>
                                            <TouchableOpacity
                                                style={styles.categoryPlusCancelButton}
                                                onPress={() => {
                                                    setWritingPlusCategory('')
                                                    setPlusCategory(false)
                                                }}
                                            >
                                                <Text>취소</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.categoryPlusConfirmButton}
                                                onPress={() => {
                                                    storeCategories([...categories, writingPlusCategory])
                                                    getAllCategories();
                                                    setWritingPlusCategory('')
                                                    setPlusCategory(false)
                                                }}
                                            >
                                                <Text style={{color: "white"}}>저장</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                                : null
                            }
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
    dateSelectCalendar: {
        position: "absolute",
        zIndex: 1,
        width: "100%",
        marginLeft: "0%",
        elevation: 10,
        padding: 10,
        borderRadius: 24,
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
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
        width: '29%',
        height: 50,
        marginHorizontal: "2%",
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "4%",
    },
    categoryItemDeleteButton: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "black",
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    categortDeleteActiveButton: {
        width: "100%", marginTop: 24, paddingHorizontal: 36, alignItems: "flex-end"
    },
    categoryPlusContainer: {
        position: "absolute",
        bottom: "60%",
        left: "10%",
        width: "80%",
        height: "30%",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        elevation: 10,
    },
    categoryPlusTitleContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    categoryPlusTitle: {
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: "center",
    },
    categoryPlusInputContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    categoryPlusInput: {
        backgroundColor: "#f5f5f7",
        width: "80%",
        height: "80%",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 14,
    },
    categoryPlusButtons: {
        flex: 4,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryPlusCancelButton: {
        backgroundColor: "#f5f5f7",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "38%",
        borderRadius: 10,
        marginRight: "4%",
    },
    categoryPlusConfirmButton: {
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "38%",
        borderRadius: 10,
    }
})