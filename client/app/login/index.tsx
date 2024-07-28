import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLoginHook } from "./useLoginHook";
import { Input } from "@/components/Input";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function Login() {
  const {
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
  } = useLoginHook();
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={styles.topIconRowContainer}>
          <ThemedView style={styles.topLeftCircle} />
          <ThemedView style={styles.topRightCircle} />
        </ThemedView>
        <Text
          style={[
            styles.loginHeader,
            { color: theme === "light" ? Colors.light.text : Colors.dark.text },
          ]}
        >
          Login
        </Text>
        <Input
          value={credentials.username}
          onChangeText={setUsername}
          placeholder={"Username"}
          onBlur={handleBlur}
          onFocus={handleFocus}
          inputRef={usernameRef}
          customStyle={{ marginHorizontal: 35 }}
        />
        <ThemedView style={styles.separator} />
        <Input
          value={credentials.password}
          onChangeText={setPassword}
          placeholder={"Password"}
          keyboardType={"default"}
          onBlur={handleBlur}
          onFocus={handleFocus}
          inputRef={passwordRef}
          hidePassword={hidePassword}
          onShowHidePassword={showHidePassword}
          customStyle={{ marginHorizontal: 35 }}
        />
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          {isButtonLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
        <ThemedView style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccountText}>
            Don't have an account?{" "}
          </Text>
          <Text style={styles.signUpText} onPress={navigateToSignup}>
            {" "}
            Sign up!
          </Text>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  topIconRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 80,
    marginTop: 20,
    marginHorizontal: 35,
  },
  topLeftCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5063BF",
  },
  topRightCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8EDFEB",
    left: -20,
  },
  loginHeader: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    textAlignVertical: "center",
    marginTop: 10,
    marginBottom: 50,
    marginHorizontal: 35,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 45,
  },
  dontHaveAccountText: {
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#878787",
  },
  signUpText: {
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#5063BF",
    textDecorationLine: "underline",
  },
  separator: {
    marginTop: 30,
  },
  loginButtonText: {
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  loginButton: {
    backgroundColor: "#5063BF",
    width: "50%",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 50,
  },
});
