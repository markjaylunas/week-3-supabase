import { Badge, Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import PostList from "../../types/post.types";

const PostListGrid = ({ postList }: { postList: PostList }) => {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 1920, cols: 3, spacing: "lg" },
        { maxWidth: 980, cols: 2, spacing: "md" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {postList.map((postItem) => (
        <Card key={postItem.id}>
          <Card.Section>
            <Image
              src={postItem.image}
              alt={postItem.description as string}
              height={300}
              fit="cover"
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
