import { Badge, Card, Group, SimpleGrid, Text } from "@mantine/core";
import Image from "next/image";
import PostList from "../../types/post.types";

const PostListGrid = ({ postList }: { postList: PostList }) => {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {postList.map((postItem) => (
        <Card key={postItem.id}>
          <Card.Section>
            <Image
              src={postItem.image as string}
              alt={postItem?.description as string}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              width={500}
              height={300}
              object-fit="cover"
            />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
            <Badge color="blue" variant="light">
              {postItem.is_public ? "public" : "private"}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {postItem.description}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default PostListGrid;
