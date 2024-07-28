import { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import api from "@/services/api";

export interface ISignUpCredential {
  username: string;
  password: string;
}

export const useSignupHook = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const [credentials, setCredentials] = useState<ISignUpCredential>({
    username: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const setUsername = (value: string) => setCredentials(prev => ({ ...prev, username: value }));
  const setPassword = (value: string) => setCredentials(prev => ({ ...prev, password: value }));

  const showHidePassword = () => setHidePassword(prev => !prev);

  const handleFocus = (itemRef: React.RefObject<TextInput>) => {
    itemRef.current?.setNativeProps({ style: styles.focused });
  };

  const handleBlur = (itemRef: React.RefObject<TextInput>) => {
    itemRef.current?.setNativeProps({ style: styles.textInputStyle });
  };

  const onSignUp = async () => {
    setIsButtonLoading(true);

    if (!credentials.username || !credentials.password) {
      Alert.alert("All fields are required!");
      setIsButtonLoading(false);
      return;
    }

    try {
      const res = await api.post("/api/signup", credentials);

      if (res.status === 200) {
        router.replace("/login");
      } else {
        Alert.alert("Registration failed. Please try again.");
      }
    } catch (err) {
      Alert.alert("Error registering. Please check your credentials and try again.");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.replace("/login");
  };

  return {
    credentials,
    setUsername,
    setPassword,
    handleBlur,
    handleFocus,
    usernameRef,
    passwordRef,
    hidePassword,
    showHidePassword,
    onSignUp,
    navigateToLogin,
    isButtonLoading,
    theme,
  };
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#C4C4C4",
    height: 50,
    width: "100%",
    color: "black",
    padding: 10,
    position: "relative",
  },
  focused: {
    borderColor: "black",
  },
});
