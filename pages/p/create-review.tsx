import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import Head from "next/head";
import CreateReviewMain from "../../components/CreateReviewPage/CreateReviewMain";

export type Profile = {
  id: string;
  created_at: string;
  email: string;
  avatar: string;
  user_id: string;
};

const CreateReview: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Review</title>
      </Head>
      <CreateReviewMain />
    </>
  );
};

export default CreateReview;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
