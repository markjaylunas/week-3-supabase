import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

const signOut = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  if (req.method === "GET") {
    try {
      // sign out user
      const { error } = await supabaseServer.auth.signOut();

      if (error) {
        res.status(401).json({ e: error });
      } else {
        res.status(201).json({
          message: "User signed out",
        });
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

export default signOut;
