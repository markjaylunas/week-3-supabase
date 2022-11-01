import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { NextPage } from "next";
import Head from "next/head";
import CreatePostMain from "../../components/CreatePostPage/CreatePostMain";

const CreatePost: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <CreatePostMain />
    </>
  );
};

export default CreatePost;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
