import type { NextApiRequest, NextApiResponse } from "next";
import supabaseServiceRole from "../../utils/supabaseServiceRole";
import apiCallRecord from "../../utils/apiCallRecord";

type FormField = {
  email: string;
  password: string;
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password }: FormField = req.body;

      // create user
      const { data, error } = await supabaseServiceRole.auth.signUp({
        email,
        password,
      });

      if (error) {
        res.status(400).json({ e: error });
      }
      const { user } = data;

      // record api call
      const baseUrl = req.headers.host;
      const apiName = req.url as string;
      const userId = user?.id as string;
      const apiUrl = `http${
        baseUrl?.includes("local") ? "" : "s"
      }://${baseUrl}${apiName}`;
      await apiCallRecord(apiUrl, userId);

      const { error: insertProfileError } = await supabaseServiceRole.rpc(
        "insert_profile",
        {
          user_id: user?.id || "",
          email: user?.email || "",
        }
      );

      if (insertProfileError) {
        console.error(insertProfileError);
      } else {
        res.status(200).json({
          message: `User ${user?.email} successfully created.`,
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

export default register;
