import type { Database } from "./database.types";

export type PostItem = Database["public"]["Tables"]["post"]["Row"];

type PostList = PostItem[];

export default PostList;
