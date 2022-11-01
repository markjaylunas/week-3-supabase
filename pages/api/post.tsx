import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../types/database.types";

const analysis = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient<Database>({ req, res });
  const sessionData = supabaseServer.auth.getSession();
  const user_id = (await sessionData).data.session?.user.id as string;
  if (req.method === "GET") {
    try {
      const { data: postData, error: postError } = await supabaseServer.rpc(
        "select_post",
        { user_id_input: user_id }
      );

      if (postError) console.error(postError);

      res.status(200).json({
        post: postData,
      });
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

export default analysis;
