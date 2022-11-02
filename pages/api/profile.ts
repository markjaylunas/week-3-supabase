import type { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../utils/supabaseClient";
import apiCallRecord from "../../utils/apiCallRecord";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
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
      const { user_id } = req.body;

      const { data, error: getProfileError } = await supabaseClient.rpc(
        "select_profile",
        { input_user_id: user_id }
      );
      if (getProfileError) {
        console.log(getProfileError);
      } else {
        res.status(200).json({
          data,
        });
      }
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else if (req.method === "GET") {
    try {
      const { data, error: getProfileError } = await supabaseClient
        .from("profile")
        .select("*");
      if (getProfileError) {
        console.log(getProfileError);
      } else {
        res.status(200).json({
          data,
        });
      }
    } catch (e) {
      res.status(500).json({ message: `Something went wrong` });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default profile;
