import { Button, Container, Grid, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Profile } from "../../pages/p/dashboard";

const DashboardMain = ({ profile }: { profile: Profile | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/sign-out");
      if (response.data) {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Stack>
        <Grid align={"space-between"}>
          <Grid.Col>
            <Title>Dashboard</Title>
          </Grid.Col>
          <Grid.Col>
            <Text size="lg">{profile?.email}</Text>
            <Button disabled={loading ? true : false} onClick={handleSignOut}>
              Sign out
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default DashboardMain;
