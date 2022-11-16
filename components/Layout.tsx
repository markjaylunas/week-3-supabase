import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Footer,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import FBMessenger from "./HomePage/FBMessenger";

export default function AppShellDemo({ children }: { children: JSX.Element }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        console.log(error);
      } else {
        const sessionData = data.session;
        setSession(sessionData);
      }
    };
    fetchSession();
  }, [supabaseClient.auth]);

  const closeMenu = () => {
    setOpened(false);
  };
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          {session === null ? (
            <>
              <Link href="/register" onClick={closeMenu}>
                <Text>Register</Text>
              </Link>
              <Link href="/sign-in" onClick={closeMenu}>
                <Text>Sign In</Text>
              </Link>
            </>
          ) : (
            <>
              <Link href="/" onClick={closeMenu}>
                <Text>Home</Text>
              </Link>
              <Link href="/p/dashboard" onClick={closeMenu}>
                <Text>Dashboard</Text>
              </Link>
              <Link href="/p/post" onClick={closeMenu}>
                <Text>Post</Text>
              </Link>
              <Link href="/p/peer-review" onClick={closeMenu}>
                <Text>Peer Review</Text>
              </Link>
              <Link href="/p/analysis" onClick={closeMenu}>
                <Text>Keyword Analysis</Text>
              </Link>
              <Link href="/p/api-call-record" onClick={closeMenu}>
                <Text>API Call Record</Text>
              </Link>
            </>
          )}
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Week 3</Text>
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Flex
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <FBMessenger />
          </Flex>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}
