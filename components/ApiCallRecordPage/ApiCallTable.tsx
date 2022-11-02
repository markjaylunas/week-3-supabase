import { Loader, Table } from "@mantine/core";
import React from "react";
import ApiCallList from "../../types/apiCall.types";

const ApiCallTable = ({ apiCallList }: { apiCallList: ApiCallList | null }) => {
  if (apiCallList === null) return <Loader />;
  const rows = apiCallList.map((api) => {
    const api_name = "https://www.test.com/api/" + api.api_name;
    const date = new Date(api.created_at || "");
    const dateFormatted = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    return (
      <tr key={api.id}>
        <td>{api_name}</td>
        <td>{dateFormatted}</td>
        <td>{api.called_by}</td>
      </tr>
    );
  });
  return (
    <Table>
      <thead>
        <tr>
          <th>API Name</th>
          <th>Created At</th>
          <th>Called By</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ApiCallTable;
