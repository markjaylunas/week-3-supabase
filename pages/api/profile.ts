import type { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../utils/supabaseClient";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default profile;
