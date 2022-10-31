import { NextPage } from "next";
import Head from "next/head";
import RegisterMain from "../components/RegisterPage/RegisterMain";
import Layout from "../components/Layout";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Layout>
        <RegisterMain />
      </Layout>
    </>
  );
};

export default SignUp;
