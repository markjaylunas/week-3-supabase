import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import Head from "next/head";
import PostMain from "../../components/PostPage/PostMain";

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PostMain />
    </>
  );
};

export default Post;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
