import { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ICredential {
  username: string;
  password: string;
}

export const useLoginHook = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const [credentials, setCredentials] = useState<ICredential>({
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

  const onLogin = async () => {
    setIsButtonLoading(true);

    if (!credentials.username || !credentials.password) {
      Alert.alert("Please enter your credentials!");
      setIsButtonLoading(false);
      return;
    }

    try {
      const res = await api.post("api/signin", credentials);

      if (res.status === 200) {
        await AsyncStorage.setItem('token', JSON.stringify(res.data.token));
        router.replace("/");
      } else {
        Alert.alert("Login failed! Please try again.");
      }
    } catch (err) {
      Alert.alert("Invalid credentials!");
    } finally {
      setIsButtonLoading(false);
    }
  };

  const navigateToSignup = () => {
    router.replace("/signup");
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
    onLogin,
    navigateToSignup,
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
