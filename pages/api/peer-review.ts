import type { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../utils/supabaseClient";

const peerReview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { data: peerReviewData, error: getPeerReviewError } =
        await supabaseClient.from("peer_review").select("*");

      if (getPeerReviewError) throw getPeerReviewError;
      else {
        res.status(200).json(peerReviewData);
      }
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default peerReview;
