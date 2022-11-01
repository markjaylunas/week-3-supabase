import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

const analysis = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });

  if (req.method === "POST") {
    try {
      const { keyword } = req.body;
      const keyword_input = `%${keyword}%`.toLowerCase();
      // select all peer_review_score with any like '%keyword%'
      const { data: keywordData, error: keywordError } =
        await supabaseServer.rpc("select_keyword", {
          keyword_input: keyword_input,
        });

      if (keywordError) console.error(keywordError);

      // get peer_review
      const { data: reviewData, error: reviewError } = await supabaseServer.rpc(
        "select_peer_review"
      );
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
