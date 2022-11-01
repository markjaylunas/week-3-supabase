import { Badge, Group, Loader, Stack, Table, Title } from "@mantine/core";
import { FC } from "react";
import { KeywordData, ProfileData, ReviewData } from "./AnalysisMain";

type Props = {
  keywordData: KeywordData[] | null;
  reviewData: ReviewData[] | null;
  profileData: ProfileData[] | null;
  keyword: string;
};

const AnalysisTable: FC<Props> = ({
  keywordData,
  reviewData,
  profileData,
  keyword,
}) => {
  if (keywordData === null || reviewData === null) return <Loader />;

  //  get set occurrence
  const occurrenceSetCount = keywordData.length;

  //   get total occurrence
  const regex = new RegExp(keyword.toLowerCase(), "g");
  const commentList = keywordData.map((data) => data.comment.toLowerCase());
  const countList = commentList.map((data) => (data.match(regex) || []).length);
  const totalOccurrence = countList.reduce((a, c) => a + c, 0);

  const rows = keywordData.map((data) => {
    const keywordPeerId = data.peer_review_id;
    const reviewCreatedBy = reviewData.filter(
      (data) => data.id === keywordPeerId
    );
    const userEmail = profileData?.filter(
      (profile) => profile.user_id === reviewCreatedBy[0].created_by
    )[0].email;

    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{userEmail}</td>
        <td>{data.comment}</td>
      </tr>
    );
  });

  return (
    <>
      <Stack>
        <Group>
          <Title order={4}>Set Occurence</Title>
          <Badge size="lg">{occurrenceSetCount}</Badge>
        </Group>
        <Group>
          <Title order={4}>Total Occurence</Title>
          <Badge size="lg">{totalOccurrence}</Badge>
        </Group>
      </Stack>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Created By</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default AnalysisTable;
