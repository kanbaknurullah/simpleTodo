import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";

export default function Modal() {
  const theme = useColorScheme() ?? "light";
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  const params = useLocalSearchParams<{
    selectedTodo: string;
  }>();
  const [todo, setTodo] = useState(
    params.selectedTodo ? JSON.parse(params.selectedTodo).text : ""
  );
  const todoInputRef = useRef<TextInput>(null);
  const updateSelectedTodo = async (id: string, text: string) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const { data } = await api.put(
          `api/update_todo/${id}`,
          { text: text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  };
  const updateTodo = async () => {
    if (params.selectedTodo) {
      let selectedTodo;
      selectedTodo = {
        id: JSON.parse(params.selectedTodo)._id,
        text: todo,
        completed: JSON.parse(params.selectedTodo).completed,
      };
      try {
        await updateSelectedTodo(selectedTodo.id, todo);
        router.back();
      } catch (e) {
        console.log("Error saving todo");
      }
    }
  };
  useEffect(() => {
    if (todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ThemedView style={{ flex: 1, alignSelf: "stretch" }}>
        <ThemedView style={{ flex: 1, alignSelf: "stretch" }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">Change your todo!</ThemedText>
              <TextInput
                ref={todoInputRef}
                placeholder="Todo"
                placeholderTextColor={
                  theme === "light" ? Colors.light.text : Colors.dark.text
                }
                style={{
                  height: 50,
                  width: "90%",
                  borderColor:
                    theme === "light"
                      ? Colors.light.tabIconSelected
                      : Colors.dark.tabIconSelected,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 8,
                  color:
                    theme === "light" ? Colors.light.text : Colors.dark.text,
                }}
                value={todo}
                onChangeText={(text) => setTodo(text)}
              />
            </ThemedView>
            <TouchableOpacity
              onPress={updateTodo}
              style={[
                styles.continueButton,
                {
                  backgroundColor:
                    theme === "light" ? Colors.light.icon : Colors.dark.icon,
                },
              ]}
            >
              <ThemedText
                darkColor={Colors.dark.buttonText}
                lightColor={Colors.light.buttonText}
              >
                Update
              </ThemedText>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ThemedView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 8,
    marginTop: 15,
    marginLeft: 15,
  },
  stepContainer: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 15,
  },
  continueButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: "auto",
    bottom: 15,
  },
  createButton: {
    position: "absolute",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: "auto",
    bottom: 15,
  },
  itemContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 15,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});
