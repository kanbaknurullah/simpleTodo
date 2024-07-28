import {
  StyleSheet,
  TouchableOpacity,
  Vibration,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useHomeHook } from "./useHomeHook";
import { router } from "expo-router";

export default function HomeScreen() {
  const {
    todos,
    setTodos,
    fetchTodos,
    isPageLoading,
    deleteTodo,
    onPressAdd,
    todoText,
    setTodoText,
    toggleCheck,
    filteredTodos,
    showUncheckedOnly,
    setShowUncheckedOnly,
    theme,
  } = useHomeHook();
  const ListItem = ({ item, renderRightActions }: any) => {
    const handlePress = () => {
      toggleCheck(item._id, item.completed);
      if (!item.completed) {
        Vibration.vibrate(100);
      }
    };

    return (
      <Swipeable
        rightThreshold={0.2}
        friction={2}
        overshootRight={false}
        key={JSON.stringify(item)}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item._id, item)
        }
      >
        <ThemedView>
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <ThemedView
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: "#AAAAAA",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                top: 2.5,
              }}
            >
              {item.completed && (
                <ThemedView
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "#007AFF",
                  }}
                />
              )}
            </ThemedView>
            <ThemedView style={{ width: "85%" }}>
              <ThemedText
                disabled={isPageLoading}
                onPress={handlePress}
                style={[
                  item.completed && { textDecorationLine: "line-through" },
                ]}
              >
                {item.text}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Swipeable>
    );
  };
  const renderItem = ({ item }: any) => {
    const renderRightActions = (
      progress: any,
      dragX: any,
      itemId: any,
      item: any
    ) => {
      const removeItem = async () => {
        const updatedItems = todos.filter((i: any) => i._id !== itemId);
        setTodos(updatedItems);
        await deleteTodo(itemId);
        await fetchTodos();
      };
      const specificTodo = item;

      return (
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "stretch",
            marginRight: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#0a7ea4",
            }}
            onPress={() => {
              router.push({
                pathname: "/modal",
                params: {
                  selectedTodo: JSON.stringify(
                    todos.find((item) => item === specificTodo)
                  ),
                },
              });
            }}
          >
            <SimpleLineIcons name="pencil" size={15} color={"#0a7ea4"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "red",
            }}
            onPress={removeItem}
          >
            <Ionicons name="trash-outline" size={15} color={"red"} />
          </TouchableOpacity>
        </ThemedView>
      );
    };

    return (
      <React.Fragment key={item.id}>
        <ListItem
          key={item.id}
          item={item}
          renderRightActions={renderRightActions}
        />
        <ThemedView
          style={{
            backgroundColor:
              theme === "light" ? Colors.light.icon : Colors.dark.icon,
            height: 1,
            marginLeft: 49,
            marginTop: 1,
          }}
        />
      </React.Fragment>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ThemedView style={{ flex: 1, height: '100%' }}>
          <ThemedView style={styles.titleContainer}>
            <ThemedView
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <ThemedText type="subtitle">Todo List</ThemedText>
              <HelloWave />
            </ThemedView>
            <Ionicons
              onPress={() => setShowUncheckedOnly((prev) => !prev)}
              name="filter"
              size={26}
              color={
                showUncheckedOnly
                  ? "green"
                  : theme === "light"
                  ? "black"
                  : "white"
              }
            />
            <ThemedView />
          </ThemedView>
          <ThemedView
            style={{
              borderRadius: 8,
              padding: 8,
            }}
          >
            {todos.length === 0 && isPageLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <FlatList
                data={filteredTodos}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 130 }}
              />
            )}
          </ThemedView>
          <ThemedView
            style={[
              styles.createButton,
              {
                backgroundColor:
                  theme === "light" ? Colors.light.icon : Colors.dark.icon,
              },
            ]}
          >
            <TextInput
              placeholder="Add new item"
              placeholderTextColor={
                theme === "light" ? Colors.light.text : Colors.dark.text
              }
              style={{
                height: 50,
                width: "90%",
                borderColor:
                  theme === "light"
                    ? Colors.dark.tabIconSelected
                    : Colors.dark.tabIconSelected,
                backgroundColor:
                  theme === "light"
                    ? Colors.light.background
                    : Colors.dark.background,
                borderWidth: 1,
                borderRadius: 10,
                padding: 8,
                color: theme === "light" ? Colors.light.text : Colors.dark.text,
              }}
              value={todoText}
              onChangeText={(text) => setTodoText(text)}
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={isPageLoading}
              onPress={onPressAdd}
            >
              <ThemedText
                darkColor={Colors.dark.buttonText}
                lightColor={Colors.light.buttonText}
                style={{
                  fontWeight: "600",
                  fontSize: 28,
                  lineHeight: 28,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                +
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 15,
  },
  createButton: {
    position: "absolute",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "90%",
    bottom: 15,
  },
});
