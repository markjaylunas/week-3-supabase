import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { MantineProvider } from "@mantine/core";

type AppSession = {
  session: Session;
};

const App = ({ Component, pageProps }: AppProps<AppSession>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.session}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default App;
