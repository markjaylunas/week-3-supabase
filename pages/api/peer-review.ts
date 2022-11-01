import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { PeerReview } from "../../components/CreateReviewPage/CreateReviewMain";

const peerReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  if (req.method === "GET") {
    try {
      const { data: peerReviewData, error: getPeerReviewError } =
        await supabaseServer.from("peer_review").select("*");

      if (getPeerReviewError) throw getPeerReviewError;
      else {
        res.status(200).json(peerReviewData);
      }
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else if (req.method === "POST") {
    try {
      const { email, stood_out, ratings }: PeerReview = req.body;
      const { data: peerReviewData, error: getPeerReviewError } =
        await supabaseServer
          .from("peer_review")
          .insert([{ email, stood_out, created_by: user?.id }])
          .select("id");

      if (getPeerReviewError)
        res.status(400).json({ error: getPeerReviewError });
      const peerReviewId = peerReviewData !== null ? peerReviewData[0].id : "";
      const { error: getPeerScoreError } = await supabaseServer
        .from("peer_review_score")
        .insert([
          {
            title: "presentation",
            comment: ratings.presentation.comment,
            score: ratings.presentation.score,
            peer_review_id: peerReviewId,
          },
          {
            title: "technical",
            comment: ratings.technical.comment,
            score: ratings.technical.score,
            peer_review_id: peerReviewId,
          },
          {
            title: "assists_peers",
            comment: ratings.assists_peers.comment,
            score: ratings.assists_peers.score,
            peer_review_id: peerReviewId,
          },
          {
            title: "documentation",
            comment: ratings.documentation.comment,
            score: ratings.documentation.score,
            peer_review_id: peerReviewId,
          },
        ]);

      if (getPeerScoreError) res.status(400).json({ error: getPeerScoreError });
      else {
        res.status(200).json({ review: peerReviewData });
      }
    } catch (e) {
      res.status(500).json({ message: `Something went wrong`, error: e });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default peerReview;
