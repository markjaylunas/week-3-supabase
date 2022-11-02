import supabaseClient from "./supabaseClient";

const apiCallRecord = async (apiName: string, calledBy: string) => {
  await supabaseClient.rpc("insert_api_call", {
    api_name_input: apiName,
    called_by_input: calledBy,
  });
};

export default apiCallRecord;
