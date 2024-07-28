import React from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  value?: string;
  onBlur?: (itemRef: React.RefObject<TextInput>) => void;
  onFocus?: (itemRef: React.RefObject<TextInput>) => void;
  onChangeText?: ((text: string) => void) | undefined;
  inputRef?: React.LegacyRef<TextInput> | undefined;
  hidePassword?: boolean;
  onShowHidePassword?: () => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  isDisabled?: boolean;
  testId?: string;
  customStyle?: StyleProp<ViewStyle>;
}

export const Input = ({
  value,
  onBlur,
  onFocus,
  onChangeText,
  hidePassword,
  onShowHidePassword,
  placeholder,
  keyboardType,
  inputRef,
  isDisabled = false,
  testId,
  customStyle,
}: Props): JSX.Element => {
  const theme = useColorScheme() ?? "light";
  const floatingPlaceholderStyle: StyleProp<ViewStyle> = {
    top: value ? -20 : 10,
  };
  return (
    <View style={[styles.inputContainer, customStyle]}>
      <TextInput
        style={[
          styles.textInputStyle,
          { color: theme === "light" ? Colors.light.text : Colors.dark.text },
        ]}
        secureTextEntry={hidePassword}
        ref={inputRef}
        onFocus={() => onFocus}
        onBlur={() => onBlur}
        keyboardType={keyboardType}
        placeholderTextColor={
          theme === "light" ? Colors.light.text : Colors.dark.text
        }
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!isDisabled}
        testID={testId}
        autoCapitalize="none"
      />
      {placeholder === "Password" ? (
        <Ionicons
          style={styles.passwordButton}
          onPress={onShowHidePassword}
          name={hidePassword ? "eye-outline" : "eye-off-outline"}
          size={26}
          color={theme === "light" ? "black" : "white"}
        />
      ) : null}
      {value ? (
        <View style={[styles.placeholderContainer, floatingPlaceholderStyle]}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "gray",
  },
  inputContainer: {
    position: "relative",
  },
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#C4C4C4",
    height: 50,
    width: "100%",
    padding: 10,
    position: "relative",
  },
  passwordButton: {
    position: "absolute",
    top: 12.5,
    right: 12.5,
  },
});
