import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import Head from "next/head";
import ApiCallRecordMain from "../../components/ApiCallRecordPage/ApiCallRecordMain";

const ApiCallRecord: NextPage = () => {
  return (
    <>
      <Head>
        <title>API Call Record</title>
      </Head>
      <ApiCallRecordMain />
    </>
  );
};

export default ApiCallRecord;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
