import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import Head from "next/head";
import AnalysisMain from "../../components/AnalysisPage/AnalysisMain";

const Analysis: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Review</title>
      </Head>
      <AnalysisMain />
    </>
  );
};

export default Analysis;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
