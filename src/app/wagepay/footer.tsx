"use client";
import { Box, Text, Icon, Link } from "@chakra-ui/react";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import Nigeria from "../../../public/ng.svg";
import { Image } from "@chakra-ui/next-js";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="#0d6efd"
      height="100px"
      justifyContent="center"
      color="white"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="small" verticalAlign="center">
        Proudly made in{" "}
        <Link as={NextLink} href="https://en.wikipedia.org/wiki/Nigeria">
          <Image
            display="inline"
            height="3"
            width="3"
            src={Nigeria}
            alt="Nigeria"
          />
        </Link>{" "}
        by Badmus Leo Kolade
      </Text>
      <Box display="flex" px="10px">
        <Link as={NextLink} href="https://twitter.com/iamleo007">
          <Icon mt="15px" mr="5px" as={RiTwitterXFill} />
        </Link>
        <Link as={NextLink} href="https://github.com/leodarkseid/">
          <Icon mt="15px" ml="5px" as={FaGithub} />
        </Link>
      </Box>
    </Box>
  );
}
