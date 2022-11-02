import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import apiCallRecord from "../../utils/apiCallRecord";

const analysis = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  // record api call
  const baseUrl = req.headers.host;
  const apiName = req.url as string;
  const userId = user?.id as string;
  const apiUrl = `http${
    baseUrl?.includes("local") ? "" : "s"
  }://${baseUrl}${apiName}`;
  await apiCallRecord(apiUrl, userId);

  if (req.method === "POST") {
    try {
      const { keyword, toSearch } = req.body;
      const keyword_input = `%${keyword}%`.toLowerCase();
      // select all post with keyword
      if (toSearch === "image") {
        const { data: keywordData, error: keywordError } =
          await supabaseServer.rpc("select_post_keyword", {
            keyword_input: keyword_input,
          });

        if (keywordError) console.error(keywordError);

        // get user_all_profile
        const { data: profileData, error: profileError } =
          await supabaseServer.rpc("select_all_profile");
        if (profileError) console.error(profileError);

        res.status(200).json({
          keywordData,
          profileData,
        });
      } else {
        const { data: keywordData, error: keywordError } =
          await supabaseServer.rpc("select_keyword", {
            keyword_input: keyword_input,
          });

        if (keywordError) console.error(keywordError);

        // get peer_review
        const { data: reviewData, error: reviewError } =
          await supabaseServer.rpc("select_peer_review");
        if (reviewError) console.error(reviewError);

        // get user_all_profile
        const { data: profileData, error: profileError } =
          await supabaseServer.rpc("select_all_profile");
        if (profileError) console.error(profileError);

        res.status(200).json({
          keywordData,
          reviewData,
          profileData,
        });
      }
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default analysis;
