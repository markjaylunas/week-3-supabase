import { Badge, Group, Loader, Stack, Table, Title } from "@mantine/core";
import { FC } from "react";
import PostList from "../../types/post.types";
import { ProfileData } from "./AnalysisMain";

type Props = {
  keywordImageData: PostList | null;
  profileData: ProfileData[] | null;
  keyword: string;
};

const AnalysisTable: FC<Props> = ({
  keywordImageData,
  profileData,
  keyword,
}) => {
  if (keywordImageData === null) return <Loader />;

  //  get set occurrence
  const occurrenceSetCount = keywordImageData.length;

  //   get total occurrence
  const regex = new RegExp(keyword.toLowerCase(), "g");
  const descriptionList = keywordImageData.map((data) =>
    data.description?.toLowerCase()
  );
  const countList = descriptionList.map(
    (data) => (data?.match(regex) || []).length
  );
  const totalOccurrence = countList.reduce((a, c) => a + c, 0);

  const rows = keywordImageData.map((data) => {
    const keywordPeerId = data.user_id;

    const userEmail = profileData?.filter(
      (profile) => profile.user_id === keywordPeerId
    )[0].email;

    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{userEmail}</td>
        <td>{data.description}</td>
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
