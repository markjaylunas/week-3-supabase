import { NextPage } from "next";
import Head from "next/head";
import RegisterPage from "../components/pages/RegisterPage";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <RegisterPage />
    </>
  );
};

export default SignUp;
