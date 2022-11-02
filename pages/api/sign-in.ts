import type { NextApiRequest, NextApiResponse } from "next";
import apiCallRecord from "../../utils/apiCallRecord";

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const userId = req.body;
      // record api call
      const baseUrl = req.headers.host;
      const apiName = req.url as string;
      const apiUrl = `http${
        baseUrl?.includes("local") ? "" : "s"
      }://${baseUrl}${apiName}`;
      await apiCallRecord(apiUrl, userId);

      res.status(200).json({ message: " Successfully signed in" });
    } catch (e) {
      res.status(200).json({ error: e });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default signIn;
