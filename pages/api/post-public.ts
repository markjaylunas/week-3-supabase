import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../types/database.types";
import apiCallRecord from "../../utils/apiCallRecord";

const analysis = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient<Database>({ req, res });
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

  if (req.method === "GET") {
    try {
      const { data: postData, error: postError } = await supabaseServer.rpc(
        "select_public_post"
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
