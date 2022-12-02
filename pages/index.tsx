import Head from "next/head";

import fs from "fs";
import {
  Box,
  Flex,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";

// getStaticProps only runs in the Node side, so it is safe
// to use libraries from Node here
export async function getStaticProps() {
  const apiRoutes = fs
    .readdirSync("./pages/api")
    .map((file) => file.split(".")[0]);

  return {
    props: { apiRoutes },
  };
}

export default function Home({ apiRoutes }: { apiRoutes: Array<string> }) {
  return (
    <>
      <Head>
        <title>LaMetric Hub</title>
      </Head>

      <Flex direction="column" h="100vh" w="100vw">
        <HStack w="full" bg="lightgray" px={4} py={2}>
          <Link href="/">
            <Text fontSize="xl" fontWeight="bold">
              LaMetric Hub
            </Text>
          </Link>
        </HStack>
        <Box p={4}>
          <Heading mb={4}>Available APIs :</Heading>

          <UnorderedList spacing={2}>
            {apiRoutes.map((apiRoute) => (
              <ListItem key={apiRoute} w="fit-content">
                <Link href={`${process.env.NEXT_PUBLIC_URL}/${apiRoute}`}>
                  <Text>/{apiRoute}</Text>
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Flex>
    </>
  );
}
