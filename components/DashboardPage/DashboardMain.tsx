import {
  Avatar,
  Button,
  Container,
  Grid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Profile } from "../../pages/p/dashboard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

const DashboardMain = ({ profile }: { profile: Profile | null }) => {
  const [userProfile, setUserProfile] = useState(profile);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

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

  const handleCompressedUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const toastLoading = toast.loading("Please wait...");
    const currentAvatarPath =
      userProfile && userProfile.avatar
        ? getAvatarPath(userProfile.avatar)
        : "";

    const inputFile = e.target.files;
    if (inputFile === null) return;
    const image = inputFile[0];
    const fileReader = new FileReader();
    try {
      fileReader.readAsDataURL(image || new Blob());
      fileReader.onload = async () => {
        if (image) {
          const { data, error } = await supabaseClient.functions.invoke(
            "compress-image",
            {
              body: image,
            }
          );
          if (error) throw error;
          if (data) {
            await removeAvatar(currentAvatarPath);
            const publicURL = await getAvatarUrl(data.data.path);
            await updateAvatarURL(publicURL);
            toast.update(toastLoading, {
              render: "Uploaded",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            router.reload();
          }
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  const getAvatarPath = (avatar: string) => {
    if (avatar.length > 0) {
      return avatar.split("avatars/")[1].split("?")[0];
    } else {
      return avatar;
    }
  };

  const removeAvatar = async (path: string) => {
    const { data: removeData, error: removeError } =
      await supabaseClient.storage.from("avatars").remove([path]);
    if (removeError) throw removeError;
    return removeData;
  };
  const getAvatarUrl = async (path: string) => {
    const {
      data: { publicUrl },
    } = await supabaseClient.storage.from("avatars").getPublicUrl(path);
    const formattedUrl = `${publicUrl}?t=${new Date().toISOString()}`;
    return formattedUrl;
  };

  const updateAvatarURL = async (avatarURL: string) => {
    const { data: updateData, error: updateError } = await supabaseClient
      .from("User")
      .update({ avatar: avatarURL })
      .eq("id", userProfile?.id)
      .select("*");
    if (updateError) throw updateError;
    else {
      setUserProfile(updateData[0] as unknown as Profile);
    }
  };
  return (
    <Container>
      <Stack>
        <Grid align={"space-between"}>
          <Grid.Col>
            <Title>Dashboard</Title>
          </Grid.Col>
          <Grid.Col>
            <Button disabled={loading ? true : false} onClick={handleSignOut}>
              Sign out
            </Button>
          </Grid.Col>
        </Grid>
        <Stack>
          <Avatar
            src={profile?.avatar}
            alt={profile?.email}
            radius="lg"
            size="xl"
          />

          <Text size="lg">{profile?.email}</Text>
          <Space h="lg" />
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleCompressedUpload}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default DashboardMain;
