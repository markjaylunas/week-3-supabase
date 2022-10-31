import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Layout>
          <>
            <Component {...pageProps} />
            <ToastContainer />
          </>
        </Layout>
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default App;
