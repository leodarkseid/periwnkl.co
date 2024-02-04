"use client";

import {
  Box,
  Flex,

  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import ToggleColorMode from "@/components/ToggleColorMode";
import { Image } from "@chakra-ui/next-js";
import logo from '../../../public/logoText.png'
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Props {
  children: React.ReactNode;
}



export default function Nav() {

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      
        <Flex as='nav' h={16} alignItems={"center"} justifyContent={"space-between"} gap='10px'>
          <Box>
            <Image alt="Logo " src={logo} />
          </Box>
          <Spacer />
          <ConnectButton />
          <ToggleColorMode />
        </Flex>
      </Box>

    </>
  );
}
