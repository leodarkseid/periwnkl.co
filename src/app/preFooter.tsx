"use client";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function PreFooter() {
  return (
    <Box
      width="100%"
      bg="transparent"
      color={useColorModeValue("#0d6efd", "white")}
      opacity="50%"
      mt="50px"
      mb="10px"
    >
      <Text
        fontSize={{ base: "10px", sm: "smaller", lg: "smaller" }}
        textAlign="center"
      >
        Powered by LightLink and LiteFlow
      </Text>
    </Box>
  );
}
