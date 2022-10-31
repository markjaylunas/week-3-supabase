import { NextPage } from "next";
import Head from "next/head";
import DashboardMain from "../../components/DashboardPage/DashboardMain";
import Layout from "../../components/Layout";

const Dashboard: NextPage = () => {
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
