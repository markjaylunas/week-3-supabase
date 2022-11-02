import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";
import { v4 as uuidV4 } from "https://esm.sh/uuid@9.0.0";
import { Buffer } from "https://deno.land/std@0.161.0/streams/mod.ts";
import * as imagescript from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Authorization, x-client-info, apikey, content-type, content-length, accept",
};

serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("SECRET_URL") || "",
    Deno.env.get("SECRET_KEY") || ""
  );
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }
  try {
    const data = await req.blob();

    if (!data) {
      return new Response(JSON.stringify({ name: "No image provided" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const bufferImage = new Buffer(await data.arrayBuffer()).bytes();

    const newImage = await (
      await imagescript.Image.decode(bufferImage)
    ).encodeJPEG(5);

    const { data: storageData, error } = await supabaseClient.storage
      .from("post")
      .upload(`image/${uuidV4()}`, newImage, {
        contentType: "image/jpeg",
      });
    if (storageData === null) {
      return new Response(JSON.stringify({ path: "null", error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ path: storageData.path, error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: e }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 401,
    });
  }
});
