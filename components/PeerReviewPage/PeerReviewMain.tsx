import { Button, Container, Loader, Space, Title } from "@mantine/core";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import PeerReviewList from "./PeerReviewList";

export type PeerReview = {
  id: string;
  email: string;
  stood_out: string;
  created_at: string;
};

const PeerReviewMain = () => {
  const [peerReviewList, setPeerReviewList] = useState<PeerReview[] | null>(
    null
  );

  useEffect(() => {
    const fetchPeerReview = async () => {
      const response = await axios.get("/api/peer-review");
      setPeerReviewList(response.data);
    };
    fetchPeerReview();
  }, []);

  return (
    <Container>
      <Title>Peer Review</Title>
      <Space h={"md"} />
      <Button>
        <Link href="/p/create-review">Create Review</Link>
      </Button>
      <Space h={"sm"} />
      {peerReviewList !== null ? (
        <PeerReviewList peerReviewList={peerReviewList} />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default PeerReviewMain;
