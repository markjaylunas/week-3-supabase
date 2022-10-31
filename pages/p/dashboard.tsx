import { useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardMain from "../../components/DashboardPage/DashboardMain";
import Layout from "../../components/Layout";

const Dashboard: NextPage = () => {
  const user = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user === null) router.replace("/sign-in");
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <DashboardMain />
      </Layout>
    </>
  );
};

export default Dashboard;
