import {
  Box,
  Button,
  chakra,
  Code,
  Flex,
  Heading,
  HStack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LaMetricData } from "../utils/types";

const Page = () => {
  const router = useRouter();
  const { path } = router.query;

  const [data, setData] = useState<LaMetricData>();

  useEffect(() => {
    fetch(`/api/${path}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [path]);

  const url = `${process.env.NEXT_PUBLIC_URL}/${path}`;
  const { onCopy, hasCopied } = useClipboard(url);

  const hasGoodFormat =
    Array.isArray(data?.frames) && data?.frames.every((frame) => !!frame.text);

  return (
    <Flex direction="column" h="100vh" w="100vw">
      <HStack w="full" bg="lightgray" px={4} py={2}>
        <Link href="/">
          <Text fontSize="xl" fontWeight="bold">
            LaMetric Hub
          </Text>
        </Link>
      </HStack>
      <Box p={4}>
        <HStack mb={4}>
          <Heading>{url}</Heading>
          <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
        </HStack>
        {!data ? (
          <Text>Loading...</Text>
        ) : (
          <chakra.pre>
            <Code
              borderRadius="md"
              p={4}
              border="2px solid"
              borderColor={hasGoodFormat ? "green" : "red"}
            >
              {JSON.stringify(data, null, 2)}
            </Code>
          </chakra.pre>
        )}
      </Box>
    </Flex>
  );
};

export default Page;
