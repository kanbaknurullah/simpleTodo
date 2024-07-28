import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";

export default function TabTwoScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }}>
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">Profile</ThemedText>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={logout}
          >
            <MaterialIcons name="logout" size={26} color={"red"} />
            <ThemedText>Log out</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
});
