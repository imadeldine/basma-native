import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import URL from "../components/URL";

import { AuthContext } from "../../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const Login = async () => {
    const response = await axios.post(`${URL}login`, {
      email: email,
      password: password,
    });
    const res = response.data;
    if (res.success) {
      await AsyncStorage.setItem("token", res.token);
      setIsLoggedIn(true);
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../../assets/logo.jpg")} /> */}

      <TextInput
        style={styles.inputView}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={styles.inputView}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={Login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {error && <Text style={styles.Error}>Invalid Email or Password</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    marginTop: 20,
    height: 200,
    width: 200,
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#016CB2",
  },

  loginText: {
    color: "#fff",
  },

  Error: {
    color: "red",
  },
});
