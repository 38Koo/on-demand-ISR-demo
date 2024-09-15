import { Box, Heading, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { ArticleCard } from "../component/ArticleCard";
import { Article } from "./article/[articleID]";

type PageProps = {
  data: Article[];
};

const Articles: NextPage<PageProps> = (props) => {
  console.log(props);
  const { data: articles } = props;

  return (
    <Box padding={20}>
      <Heading as="h1">Articles</Heading>
      <Stack spacing="24px" pt="24px">
        {!!articles &&
          articles.length > 0 &&
          articles.map((article, index) => (
            <ArticleCard
              key={index}
              id={article.id}
              attributes={article.attributes}
            />
          ))}
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const res = await fetch("http://localhost:1337/api/articles");
  const data = await res.json();

  return {
    props: data,
  };
};

export default Articles;
