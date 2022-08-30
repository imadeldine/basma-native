import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Button, Menu, Dialog, Portal, List } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "./URL";
import { AuthContext } from "../../App";

const MyMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [logout, setLogout] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const Logout = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${URL}logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsLoggedIn(false);
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{ width: "100%" }}
        anchor={
          <Button onPress={openMenu}>
            <Feather name="menu" size={24} color="black" />
          </Button>
        }
      >
        <List.Item
          onPress={() => {
            navigation.navigate("Home");
            setVisible(false);
          }}
          title="Home"
        />
        <List.Item
          onPress={() => {
            navigation.navigate("Averages");
            setVisible(false);
          }}
          title="Averages"
        />
        <List.Item
          onPress={() => {
            setVisible(false);
            setLogout(true);
          }}
          title="Logout"
        />
        <List.Item
          onPress={() => {
            closeMenu();
          }}
          title="Close Menu"
        />
      </Menu>
      <Portal>
        <Dialog visible={logout} onDismiss={() => setLogout(false)}>
          <Dialog.Content>
            <Text>Are you sure you want to Logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLogout(false)}>Cancel</Button>
            <Button onPress={() => Logout()}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MyMenu;
