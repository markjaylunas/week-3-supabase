import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

type FormField = {
  email: string;
  password: string;
};

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient({ req, res });
  if (req.method === "POST") {
    try {
      const { email, password }: FormField = req.body;

      // sign in user
      const { data, error } = await supabaseServer.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        res.status(401).json({ e: error });
      } else {
        res.status(201).json({
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

export default signIn;
