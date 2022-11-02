import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../types/database.types";
import apiCallRecord from "../../utils/apiCallRecord";

const analysis = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient<Database>({ req, res });
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const user_id = user?.id as string;

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
      const userId = user_id as string;
      const { data: postData, error: postError } = await supabaseServer.rpc(
        "select_post",
        { user_id_input: userId }
      );

      if (postError) console.error(postError);
      res.status(200).json({
        post: postData,
      });
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else if (req.method === "POST") {
    const { image, description, is_public } = req.body;
    try {
      const { error: postError } = await supabaseServer.rpc("create_post", {
        image_input: image,
        description_input: description,
        is_public_input: is_public,
        user_id_input: user_id,
      });

      if (postError) console.error(postError);
      res.status(200).json({
        message: "Posted successfully",
      });
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default analysis;
