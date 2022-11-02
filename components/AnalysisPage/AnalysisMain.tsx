import {
  Container,
  Group,
  Loader,
  SegmentedControl,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PostList from "../../types/post.types";
import AnalysisTable from "./AnalysisTable";
import ImageAnalysisTable from "./ImageAnalysisTable";

export type KeywordData = {
  id: number;
  title: string;
  score: number;
  comment: string;
  peer_review_id: string;
  created_at: string;
};
export type ReviewData = {
  id: string;
  email: string;
  stood_out: string;
  created_by: string;
  created_at: string;
};
export type ProfileData = {
  id: string;
  email: string;
  avatar: string;
  user_id: string;
  created_at: string;
};

const AnalysisMain = () => {
  const [loading, setLoading] = useState(false);
  const [segment, setSegment] = useState("image");
  const { register, handleSubmit } = useForm<{ keyword: string }>();
  const [reviewData, setReviewData] = useState<ReviewData[] | null>(null);
  const [keywordData, setKeywordData] = useState<KeywordData[] | null>(null);
  const [keywordImageData, setKeywordImageData] = useState<PostList | null>(
    null
  );
  const [profileData, setProfileData] = useState<ProfileData[] | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const onSubmit = async (data: { keyword: string }) => {
    if (data.keyword.length < 2) return;
    setKeywordInput(data.keyword);
    try {
      setLoading(true);
      const response = await axios.post("/api/analysis", {
        keyword: data.keyword,
        toSearch: segment,
      });
      if (segment === "employee") {
        setReviewData(response.data.reviewData);
        setKeywordData(response.data.keywordData);
      } else {
        setKeywordImageData(response.data.keywordData);
      }
      setProfileData(response.data.profileData);
    } catch (error) {
      const err = error as AxiosError | Error;
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data.message);
      } else {
        console.error(err);
      }
    }
    setLoading(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group align={"flex-end"}>
          <TextInput label="Keyword" {...register("keyword")} />

          <button disabled={loading ? true : false} className="btn">
            {loading ? "Searching ..." : "Search"}
          </button>
        </Group>
      </form>

      <Space h={"md"} />
      <SegmentedControl
        value={segment}
        onChange={setSegment}
        data={[
          { label: "Image", value: "image" },
          { label: "Employee", value: "employee" },
        ]}
      />
      <Space h={"md"} />
      {loading ? (
        <Loader />
      ) : reviewData === null ? (
        <Text color={"gray"}>Search a keyword</Text>
      ) : segment === "image" ? (
        <ImageAnalysisTable
          keywordImageData={keywordImageData}
          profileData={profileData}
          keyword={keywordInput}
        />
      ) : (
        <AnalysisTable
          keywordData={keywordData}
          reviewData={reviewData}
          profileData={profileData}
          keyword={keywordInput}
        />
      )}
    </Container>
  );
};

export default AnalysisMain;
