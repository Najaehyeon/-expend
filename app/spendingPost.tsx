import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpendingPost() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{flex: 1, backgroundColor: "#F5F5F7"}}>
            <View style={styles.contentContainer}>
                <View style={styles.dateContainer}>
                    <Text>날짜</Text>
                    <TouchableOpacity
                        style={styles.dateSelectContainer}
                        activeOpacity={0.6}
                    >
                        <Text>2025-11-18 화</Text>
                        <MaterialIcons name="date-range" size={24} color="#B1B1B1" />
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryContainer}>
                    <Text>카테고리</Text>
                    <TouchableOpacity
                        style={styles.categorySelectContainer}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.categorySelectText}>카테고리를 선택해주세요.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <Text>세부 내용</Text>
                    <TextInput
                        style={styles.detailSelectContainer}
                        placeholder='세부 내용을 입력해주세요.'
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
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 24,
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
    }
})