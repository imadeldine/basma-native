import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Menu, Button, List } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MyMenu from "../components/MyMenu";
import URL from "../components/URL";

const Averages = ({ navigation }) => {
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dur, setDur] = useState("Day");
  const [data, setData] = useState("");

  const fetchData = async () => {
    setLoad(true);
    let token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${URL}${dur}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.data[0].count);
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [dur]);

  return (
    <SafeAreaView style={{ paddingTop: 40 }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.container}>
          <MyMenu navigation={navigation} />
          <Text
            style={{
              paddingLeft: 12,
              fontSize: 18,
              marginBottom: 30,
              marginTop: 20,
            }}
          >
            Check the average number of customers registered:
          </Text>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{ width: "100%" }}
            anchor={
              <Button onPress={() => setVisible(true)}>
                <Text>Choose Duration</Text>
              </Button>
            }
          >
            <List.Item
              title="Last 24 hours"
              onPress={() => {
                setVisible(false);
                setDur("Day");
              }}
            />
            <List.Item
              title="Last Week"
              onPress={() => {
                setVisible(false);
                setDur("Week");
              }}
            />
            <List.Item
              title="Last Month"
              onPress={() => {
                setVisible(false);
                setDur("month");
              }}
            />
            <List.Item
              title="Last 3 Months"
              onPress={() => {
                setVisible(false);
                setDur("month");
              }}
            />
            <List.Item
              title="Last Year"
              onPress={() => {
                setVisible(false);
                setDur("year");
              }}
            />
          </Menu>
        </View>
        {load ? (
          <View style={styles.loading}>
            <Text>Loading ... </Text>
          </View>
        ) : (
          data && (
            <View style={styles.main}>
              <Text style={{ fontSize: 90 }}>{data}</Text>
              <Text style={{ fontSize: 40 }}>Customers</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFDFDF",
    height: 200,
  },
  loading: {
    display: "flex",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
  },
});
export default Averages;
