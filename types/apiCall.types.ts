import type { Database } from "./database.types";

export type ApiCallItem = Database["public"]["Tables"]["api_call"]["Row"];

type ApiCallList = ApiCallItem[];

export default ApiCallList;
