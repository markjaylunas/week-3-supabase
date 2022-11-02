import { Container, Loader, Space, Text, Title } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostList from "../../types/post.types";
import PostListGrid from "./HomePostListGrid";

const HomePostMain = () => {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<PostList | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/post-public");
        setPostList(response.data.post);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPost();
  }, []);

  return (
    <Container>
      <Title>Public Image Posts</Title>
      <Space h={"md"} />
      {loading ? (
        <Loader />
      ) : postList === null ? (
        <Text>No post available</Text>
      ) : (
        <PostListGrid postList={postList} />
      )}
    </Container>
  );
};

export default HomePostMain;
