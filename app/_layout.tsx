import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          statusBarStyle: "dark"
        }}
      />
      <Stack.Screen
        name="spendingPost"
        options={{
          title: "지출 내역 작성",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#F5F5F7"
          },
          contentStyle: {
            backgroundColor: "#F5F5F7"
          },
          statusBarStyle: "dark"
        }}
      />
    </Stack>
  )
}
