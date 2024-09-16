import { Box, Divider, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router, { useRouter } from "next/router";

export type Article = {
  id: number;
  attributes: {
    ArticleName: string;
    Content: string;
  };
};

type PageProps = {
  article: { data: Article | null };
  previewMode: boolean;
};

type PathParams = {
  articleID: string;
};

export default function Article({ article, previewMode }: PageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <></>;
  }

  if (!article.data) {
    return <></>;
  }

  console.log("Article", article);

  return (
    <Box p="3rem">
      {previewMode && (
        <Box>
          <Box as="span">You are currently viewing in Preview Mode. </Box>
          <Link
            role="button"
            className="text-primary"
            onClick={() => exitPreviewMode()}
          >
            Turn Off Preview Mode
          </Link>
        </Box>
      )}
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

export const getStaticProps: GetStaticProps<PageProps, PathParams> = async (
  context
) => {
  console.log("121289347128374123741273498172394719283749");

  const previewMode = context.preview ? true : false;

  const fetchURL = `http://localhost:1337/api/articles/${
    context.params?.articleID
  }${previewMode ? "?publicationState=preview" : ""}`;

  const res = await fetch(fetchURL);
  const article = await res.json();

  const isPublished = article.data.publishedAt ? true : false;
  if (!isPublished && !previewMode) {
    return { props: { article: { data: null }, previewMode } };
  }

  return { props: { article, previewMode } };
};

async function exitPreviewMode() {
  const response = await fetch("/api/exit-preview");
  if (response) {
    Router.reload();
  }
}
