import { NextPage } from "next";
import Head from "next/head";
import SignInPage from "../components/SignInPage/SignInMain";
import Layout from "../components/Layout";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Layout>
        <SignInPage />
      </Layout>
    </>
  );
};

export default SignIn;
