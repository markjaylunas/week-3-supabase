import { NextPage } from "next";
import Head from "next/head";
import RegisterMain from "../components/RegisterPage/RegisterMain";
import Layout from "../components/Layout";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Layout>
        <RegisterMain />
      </Layout>
    </>
  );
};

export default Register;
