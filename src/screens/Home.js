import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet, ScrollView, SafeAreaView, Text, View } from "react-native";

import URL from "../components/URL";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import Customer from "../components/Customer";
import MyMenu from "../components/MyMenu";

const Home = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [num, setNum] = useState(20);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(true);

  const numberOfItemsList = [20, 40, 60];
  const getCustomers = async () => {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(
      `${URL}GetCustomers?page=${page + 1}&num=${num}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    setCustomers(response.data.data.data);
    setNumberOfPages(
      Math.ceil(response.data.data.total / response.data.data.per_page)
    );
    setTotal(response.data.data.total);
    setLoad(false);
  };

  useEffect(() => {
    getCustomers();
  }, [page, num]);

  return (
    <SafeAreaView style={{ paddingTop: 40 }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.container}>
          <DataTable>
            <MyMenu navigation={navigation} />
            <DataTable.Pagination
              page={page}
              numberOfPages={numberOfPages}
              onPageChange={(page) => {
                setLoad(true);
                setPage(page);
              }}
              label={
                load
                  ? "from .. to .."
                  : `from ${page * num + 1} to ${
                      page != numberOfPages - 1 ? (page + 1) * num : total
                    }`
              }
              showFastPaginationControls
              numberOfItemsPerPageList={numberOfItemsList}
              numberOfItemsPerPage={num}
              onItemsPerPageChange={(num) => {
                setLoad(true);
                setPage(0);
                setNum(num);
              }}
              selectPageDropdownLabel={"Rows per page"}
            />
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
            </DataTable.Header>
          </DataTable>
        </View>
        {load ? (
          <View style={styles.loading}>
            <Text>Loading ... </Text>
          </View>
        ) : (
          <DataTable>
            {customers &&
              customers.map((ele) => <Customer key={ele.id} customer={ele} />)}
          </DataTable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFDFDF",
  },
  loading: {
    display: "flex",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
