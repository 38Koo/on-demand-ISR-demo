import { Box, Heading, Link } from "@chakra-ui/react";
import { Article } from "../pages";

export const ArticleCard = ({ id, attributes }: Article) => {
  return (
    <Link href={`/article/${id}`}>
      <Box
        height="200"
        width="60%"
        border="solid 1px #CCD7EA"
        borderRadius="24px"
        p="20px"
        bgColor="white"
        shadow="md"
      >
        <Box height="30%">
          <Heading as="h3" fontWeight="bold" fontSize="24px">
            {attributes.ArticleName}
          </Heading>
        </Box>
        <Box>{attributes.Content}</Box>
      </Box>
    </Link>
  );
};
