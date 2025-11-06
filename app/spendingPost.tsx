import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SpendingPost() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{flex: 1, paddingTop: insets.top, backgroundColor: "#F5F5F7"}}>
            <View style={styles.contentContainer}>
                <View style={styles.dateContainer}>
                    <Text>날짜</Text>
                    <TouchableOpacity>
                        <Text>2025-11-18 화</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryContainer}>
                    <Text>카테고리</Text>
                    <TouchableOpacity>
                        <Text>카테고리를 선택해주세요.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailContainer}>
                    <Text>세부 내용</Text>
                    <TextInput/>
                </View>
                <View style={styles.priceContainer}>
                    <Text>금액</Text>
                    <TextInput/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text>저장하기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.paddingContainer} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
    },
    dateContainer: {
        flex: 1,
    },
    categoryContainer: {
        flex: 1,
    },
    detailContainer: {
        flex: 1,
    },
    priceContainer: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
    },
    paddingContainer: {
        flex: 4
    }
})