import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function PreFooter() {
  return (
    <Box
      width="100%"
      bg="transparent"
      color={useColorModeValue("#0d6efd", "white")}
    >
      <Text textAlign="center">Powered by LightLink and LiteFlow</Text>
    </Box>
  );
}
