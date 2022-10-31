import { Loader } from "@mantine/core";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PeerReviewMain from "../../components/PeerReviewPage/PeerReviewMain";

export type Profile = {
  id: string;
  created_at: string;
  email: string;
  avatar: string;
  user_id: string;
};

const PeerReview: NextPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.auth.getSession();
      const user_id = data.session?.user.id;
      const response = await axios.post("/api/profile", { user_id });
      setProfile(response.data.data[0]);
    };
    fetchProfile();
  }, [supabase.auth]);

  return (
    <>
      <Head>
        <title>Peer Review</title>
      </Head>
      <Layout>{profile !== null ? <PeerReviewMain /> : <Loader />}</Layout>
    </>
  );
};

export default PeerReview;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
});
