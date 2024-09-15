import { Box, Divider, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export type Article = {
  id: number;
  attributes: {
    ArticleName: string;
    Content: string;
  };
};

type PageProps = {
  article: { data: Article };
};

type PathParams = {
  articleID: string;
};

export default function Article({ article }: PageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <></>;
  }

  return (
    <Box p="3rem">
      <Stack spacing="2rem">
        <Box
          height="80vh"
          width="100%"
          border="solid 1px #CCD7EA"
          borderRadius="24px"
          p="20px"
          bgColor="white"
          shadow="md"
        >
          <Stack spacing="4">
            <Box height="10%">
              <Heading as="h2" fontSize="36px" fontWeight="bold">
                {article.data.attributes.ArticleName}
              </Heading>
            </Box>
            <Divider borderColor="#B7C6C7" borderWidth="3px" />
            <Box pt="1rem">{article.data.attributes.Content}</Box>
          </Stack>
        </Box>
        <Link href="/" color="teal.500">
          <Text fontSize="24px" fontWeight="bold">
            記事一覧に戻る
          </Text>
        </Link>
      </Stack>
    </Box>
  );
}

// publishされたらwebhookでon-demand ISR

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const res = await fetch("http://localhost:1337/api/articles");
  const data = await res.json();

  const paths = data.data.map((article: Article) => ({
    params: { articleID: article.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<PageProps, PathParams> = async ({
  params,
}) => {
  const res = await fetch(
    `http://localhost:1337/api/articles/${params?.articleID}`
  );
  const article = await res.json();

  return { props: { article: article } };
};
