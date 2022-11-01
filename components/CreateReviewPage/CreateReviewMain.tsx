import {
  Button,
  Container,
  Divider,
  Select,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Profile } from "../../pages/p/dashboard";

type PeerReviewScore = {
  comment: string;
  score: number;
};

export type PeerReview = {
  email: string;
  stood_out: string;
  ratings: {
    presentation: PeerReviewScore;
    technical: PeerReviewScore;
    assists_peers: PeerReviewScore;
    documentation: PeerReviewScore;
  };
};

const CreateReviewMain = () => {
  const [loading, setLoading] = useState(false);
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PeerReview>();

  const getProfileList = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfileList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const onSubmit = async (data: PeerReview) => {
    console.log("submit", data);
    const toastLoading = toast.loading("Saving ...");
    try {
      setLoading(true);
      await axios.post("/api/peer-review", data);
      toast.update(toastLoading, {
        render: `New review to ${data.email} added`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      reset();
      router.push("/p/peer-review");
    } catch (error) {
      const err = error as AxiosError | Error;
      if (axios.isAxiosError(err)) {
        setLoading(false);
        toast.update(toastLoading, {
          render: err.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        console.error(err);
      }
    }
    setLoading(false);
  };

  const handleEmailChange = (value: string | null) => {
    if (value !== null) setValue("email", value);
  };
  const handlePresentationSelect = (value: string | null) => {
    if (value !== null) setValue("ratings.presentation.score", Number(value));
  };
  const handleTechnicalSelect = (value: string | null) => {
    if (value !== null) setValue("ratings.technical.score", Number(value));
  };
  const handleAssistsPeersSelect = (value: string | null) => {
    if (value !== null) setValue("ratings.assists_peers.score", Number(value));
  };
  const handleDocumentationSelect = (value: string | null) => {
    if (value !== null) setValue("ratings.documentation.score", Number(value));
  };

  useEffect(() => {
    if (profileList.length === 0) {
      getProfileList();
    }
  }, [profileList.length]);

  return (
    <Container>
      <Button onClick={handleBack}>Back</Button>
      <Title>Create Peer Review</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Peer"
          placeholder="Pick one"
          searchable
          required
          nothingFound="No options"
          withAsterisk
          data={profileList.map((peer) => {
            return peer.email;
          })}
          onChange={handleEmailChange}
        />

        <Textarea
          placeholder="Optional"
          label="Stood Out"
          {...register("stood_out")}
        />
        {/* presentation */}
        <Divider my="sm" />
        <Stack>
          <Title size={"h3"}>Presentation</Title>
          <Select
            label="Score"
            placeholder="Pick one"
            searchable
            required
            nothingFound="No options"
            withAsterisk
            data={["1", "2", "3", "4", "5"]}
            onChange={handlePresentationSelect}
          />
          <Textarea
            minLength={1}
            placeholder="Enter here..."
            label="Comment"
            {...register("ratings.presentation.comment", {
              required: "Give a comment on presentation",
            })}
          />
          <Text role="alert" className="error" color="red">
            {errors.ratings?.presentation?.comment?.message}
          </Text>
        </Stack>
        {/* technical */}

        <Divider my="sm" />
        <Stack>
          <Title size={"h3"}>Technical</Title>
          <Select
            label="Score"
            placeholder="Pick one"
            searchable
            required
            nothingFound="No options"
            withAsterisk
            data={["1", "2", "3", "4", "5"]}
            onChange={handleTechnicalSelect}
          />
          <Textarea
            minLength={1}
            placeholder="Enter here..."
            label="Comment"
            {...register("ratings.technical.comment", {
              required: "Give a comment on technical",
            })}
          />
          <Text role="alert" className="error" color="red">
            {errors.ratings?.technical?.comment?.message}
          </Text>
        </Stack>
        {/* assists_peers */}

        <Divider my="sm" />
        <Stack>
          <Title size={"h3"}>Assists Peers</Title>
          <Select
            label="Score"
            placeholder="Pick one"
            searchable
            required
            nothingFound="No options"
            withAsterisk
            data={["1", "2", "3", "4", "5"]}
            onChange={handleAssistsPeersSelect}
          />
          <Textarea
            minLength={1}
            placeholder="Enter here..."
            label="Comment"
            {...register("ratings.assists_peers.comment", {
              required: "Give a comment on assists peers",
            })}
          />
          <Text role="alert" className="error" color="red">
            {errors.ratings?.assists_peers?.comment?.message}
          </Text>
        </Stack>
        {/* documentation */}

        <Divider my="sm" />
        <Stack>
          <Title size={"h3"}>Documentation</Title>
          <Select
            label="Score"
            placeholder="Pick one"
            searchable
            required
            nothingFound="No options"
            withAsterisk
            data={["1", "2", "3", "4", "5"]}
            onChange={handleDocumentationSelect}
          />
          <Textarea
            minLength={1}
            placeholder="Enter here..."
            label="Comment"
            {...register("ratings.documentation.comment", {
              required: "Give a comment on documentation",
            })}
          />
          <Text role="alert" className="error" color="red">
            {errors.ratings?.documentation?.comment?.message}
          </Text>
        </Stack>

        {/* <TextInput
          placeholder={`Enter rating 1(lowest) - ${max}(highest)`}
          label="Rating"
          withAsterisk
          type="number"
          defaultValue={max}
          {...register("rating", {
            required: "Rating is required",
            valueAsNumber: true,
            min: {
              value: 1.0,
              message: "Rating must be at least 1",
            },
            max: {
              value: max,
              message: `Max rating is ${max}`,
            },
            minLength: {
              value: 1,
              message: "Must have at least one digit",
            },
          })}
          aria-invalid={errors.rating ? "true" : "false"}
        />

        <p role="alert" className="error">
          {errors.rating?.message}
        </p> */}
        <Space h={"md"} />
        <button disabled={loading ? true : false} className="btn">
          {loading ? "Saving ..." : "Save"}
        </button>
      </form>
    </Container>
  );
};

export default CreateReviewMain;
