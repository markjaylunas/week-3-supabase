import { Container, Loader, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ApiCallList from "../../types/apiCall.types";
import supabase from "../../utils/supabaseClient";
import ApiCallTable from "./ApiCallTable";

const ApiCallRecordMain = () => {
  const [loading, setLoading] = useState(true);
  const [apiCallList, setApiCallList] = useState<ApiCallList | null>(null);

  useEffect(() => {
    const fetchApiCall = async () => {
      const { data, error } = await supabase.rpc("select_api_call");
      const userData = data as unknown as ApiCallList;
      if (error) console.error(error);
      setApiCallList(userData);
      setLoading(false);
    };
    fetchApiCall();
  }, []);
  return (
    <Container>
      <Title>Api Call Record</Title>
      {loading ? <Loader /> : <ApiCallTable apiCallList={apiCallList} />}
    </Container>
  );
};

export default ApiCallRecordMain;
