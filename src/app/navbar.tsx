/* eslint-disable */
"use client";
import ToggleColorMode from "@/components/ToggleColorMode";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Image } from "@chakra-ui/next-js";
import logo from "../../public/logoWhite.svg";
import logoText from "../../public/logoText.png";
export default function NavBar() {
  const pathname = usePathname();

  const isStockPage = pathname.startsWith("/stock");
  const isWagePage = pathname.startsWith("/wagepay");
  const isFrontPage = pathname.startsWith("/");

  if (isStockPage || isWagePage) {
    return (
      <>
        <Box
          bg={useColorModeValue("#0d6efd", "gray.900")}
          px={4}
          maxWidth="100%"
        >
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
            <Text
              color="white"
              display={{ base: "none", md: "block", lg: "block" }}
            >
              {isStockPage ? "Stock Manger" : "WagePay"}
            </Text>
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
  } else if (isFrontPage) {
    return (
      <>
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex
            as="nav"
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap="10px"
          >
            <Box>
              <Image alt="Logo " src={logoText} />
            </Box>
            <Spacer />

            <ToggleColorMode />
          </Flex>
        </Box>
      </>
    );
  }
}
