"use client";

import {
  Box,
  Flex,
  useColorModeValue,
  Spacer,
  Text,
  Link
} from "@chakra-ui/react";
import ToggleColorMode from "@/components/ToggleColorMode";
import { Image } from "@chakra-ui/next-js";
import logo from "../../../public/logoWhite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Props {
  children: React.ReactNode;
}

export default function Nav() {
  return (
    <>
      <Box bg={useColorModeValue("#0d6efd", "gray.900")} px={4} maxWidth='100%'>
        <Flex
          as="nav"
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap="10px"
        >
          <Box>
            <Image alt="Logo " src={logo} width={35} />
          </Box>
          <Text color="white" display={{base:'none', md:'block', lg:'block'}}>Stock Manager</Text>
          <Spacer />
          <Link _hover={{ textDecoration: "none", color: "lightGray" }}>
            <Text
              color="white"
              _hover={{ textDecoration: "none", color: "lightGray" }}
            >
              Employee
            </Text>
          </Link>
          <Link _hover={{ textDecoration: "none", color: "grey-500" }}>
            <Text
              color="white"
              _hover={{ textDecoration: "none", color: "lightGray" }}
            >
              Organisation
            </Text>
          </Link>
          <ConnectButton label="connect" />
          <ToggleColorMode />
        </Flex>
      </Box>
    </>
  );
}
