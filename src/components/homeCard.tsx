"use client";

import {
  Card,
  CardBody,
  CardFooter,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import WageSvg from "../../public/wage.svg";
import { Image } from "@chakra-ui/next-js";

interface homeCardProps {
  image: any;
  nameOfCard: string;
  active: boolean
}

export default function HomeCard(props: homeCardProps) {
  return (
    <Card
      justifySelf="center"
      width={{ base: "50%", md: "150px", lg: "300px" }}
      height={{ base: "70p%", md: "250px", lg: "400px" }}
      marginY="10px"
      bg="white"
      boxShadow="lg"
      roundedTop="20px"
      roundedBottom="0px"
      borderBottom="transparent"
      borderWidth="medium"
      borderColor={props.active ? "#0d6efd" : "#6b7684"}
      cursor="pointer"
      overflow="hidden"
      transitionTimingFunction="cubicBezier(0.4, 0, 0.2, 1)"
      transitionProperty="all"
      transitionDuration="500ms"
      _hover={{ transform: props.active ? "scale(1.07)" : "scale(1)" }}
      // sx= a ? {{
      //   _hover: {
      //     transform: "scale(1.07)",
      //   },
      // }} : ''
    >
      <CardBody>
        <Image src={props.image} alt="image" />
      </CardBody>
      <CardFooter
        justifyContent="center"
        alignContent="center"
        verticalAlign="center"
        textAlign="center"
        bg={props.active ? "#0d6efd" : "#6b7684"}
        width="100%"
        color="white"
      >
        <Text
          fontSize={{ base: "small", md: "large", lg: "large" }}
          textAlign="center"
          fontWeight={{ base: "medium", md: "bold", lg: "bold" }}
        >
          {props.nameOfCard}
          <br />
          { props.active ? null: <Text fontSize='8px' >(Coming soon)</Text>}
        </Text>
      </CardFooter>
    </Card>
  );
}
