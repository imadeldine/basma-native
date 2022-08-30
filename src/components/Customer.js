import React from "react";
import { DataTable } from "react-native-paper";

const Customer = ({ customer }) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{customer.firstname}</DataTable.Cell>
      <DataTable.Cell>{customer.email}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default Customer;
