import { Box, useColorModeValue, Text } from "@chakra-ui/react";

import { CgProfile } from "react-icons/cg";

interface ListCardProps {
  id: number;
  address: string;
  onClick: () => void;
}
export default function ListEmployee(props: ListCardProps){
    return (
      <Box
        bgColor="#E6F4F1"
        as="div"
        display="grid"
        gap="2"
        gridTemplateColumns="5% 25% 55% 15%"
        color="#0d6efd"
        verticalAlign="center"
        alignItems="center"
        px={3}
        overflow="hidden"
        roundedBottom="4px"
        width="100%"
        mb={3}
        cursor="pointer"
        transitionTimingFunction="cubicBezier(0.4, 0, 0.2, 1)"
        transitionProperty="all"
        transitionDuration="500ms"
        _hover={{transform :"scale(1.07)"}}
        minHeight= "25px"
        onClick={props.onClick}
      >
        
        <Text noOfLines={1}>{props.id}</Text>
        <span>
          <CgProfile />
        </span>
        <Text noOfLines={1}>{props.address}</Text>
      </Box>
    );
}