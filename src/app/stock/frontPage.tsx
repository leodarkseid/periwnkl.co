"use client";
import {
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StockSVG from "../../../public/stockPage.svg";
import Security from "../../../public/securityEllipse.svg";
import SupportMo from "../../../public/supportMO.svg";
import HandShake from "../../../public/handShake.svg";
import Team from "../../../public/team.svg";
import { Image } from "@chakra-ui/next-js";
import { Lilita_One } from "next/font/google";


export default function FrontPage() {
  return (
    <Container
      as="section"
      maxWidth="100%"
      display="grid"
      justifyContent="center"
    >
      <SimpleGrid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        spacing={5}
        minChildWidth="250px"
        mt="5vh"
        justifySelf="center"
      >
        <GridItem>
          <Flex as="div" display="flex" flexDirection="column">
            <Heading
              backgroundClip="text"
              textColor="transparent"
              as="h1"
              bgGradient="linear-gradient(to-r, #0d6efd, #ff6f61, #0d6efd, #0d6efd )"
              fontFamily="sans-serif"
              fontSize={{ base: "40px", md: "50px", lg: "62px" }}
              alignSelf={{ base: "center", sm: "center", lg: "normal" }}
            >
              Stock Manager
            </Heading>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={useColorModeValue("#0d6efd", "white")}
              width="70%"
              opacity="50%"
              alignSelf={{ base: "center", sm: "center", lg: "normal" }}
              textAlign={{ base: "center", sm: "center", lg: "left" }}
            >
              A simple and secure way to manage StockOptions for Organizations
              and Employee in a Trustless Manner
            </Text>

            <Flex
              as="div"
              display="flex"
              flexDirection="column"
              gap={{ base: "2", md: "5", lg: "1" }}
              mt={{ base: "25px", md: "15px", lg: "50px" }}
            >
              <Text
                alignSelf={{ base: "center", sm: "center", lg: "normal" }}
                textAlign={{ base: "center", sm: "center", lg: "left" }}
                color={useColorModeValue("#0d6efd", "white")}
              >
                For Organisations
              </Text>
              <Button
                alignSelf={{ base: "center", sm: "center", lg: "normal" }}
                textAlign={{ base: "center", sm: "center", lg: "left" }}
                colorScheme="blue"
                width={{ base: "50%", md: "25%", lg: "25%" }}
              >
                Organisations
              </Button>
              <Text
                alignSelf={{ base: "center", sm: "center", lg: "normal" }}
                textAlign={{ base: "center", sm: "center", lg: "left" }}
                color={useColorModeValue("#0d6efd", "white")}
              >
                For Employees
              </Text>
              <Button
                alignSelf={{ base: "center", sm: "center", lg: "normal" }}
                textAlign={{ base: "center", sm: "center", lg: "left" }}
                colorScheme="blue"
                width={{ base: "50%", md: "25%", lg: "25%" }}
              >
                Employee
              </Button>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem justifySelf="center">
          <Image
            src={StockSVG}
            alt="stock"
            boxSize={{ base: "200px", md: "350px", lg: "400px" }}
            style={{ fill: "context-fill" }}
          />
        </GridItem>
      </SimpleGrid>

      <Flex
        as="div"
        display="flex"
        flexDirection="column"
        justifySelf="center"
        alignItems="center"
        mt={{ base: "25px", md: "15px", lg: "35px" }}
      >
        <Text
          fontSize={{ base: "smaller", md: "small", lg: "xl" }}
          fontWeight="medium"
          alignSelf={{ base: "center", sm: "center", lg: "normal" }}
          textAlign={{ base: "center", sm: "center", lg: "center" }}
          color={useColorModeValue("#0d6efd", "white")}
        >
          Built With Smart Contracts, with the strength and advantage of
          Blockchain Technology
        </Text>
        <Image
          src={Security}
          alt="security"
          boxSize={{ base: "100px", md: "100px", lg: "100px" }}
        />
        <Text
          fontSize={{ base: "smaller", md: "small", lg: "xl" }}
          alignSelf={{ base: "center", sm: "center", lg: "normal" }}
          textAlign={{ base: "center", sm: "center", lg: "center" }}
          fontWeight="medium"
          color={useColorModeValue("#0d6efd", "white")}
        >
          Support For Multiple Organisations for Both Admins and Employees
        </Text>
        <Image
          src={SupportMo}
          alt="support"
          boxSize={{ base: "100px", md: "100px", lg: "200px" }}
        />
        <Text
          fontSize={{ base: "smaller", md: "small", lg: "xl" }}
          alignSelf={{ base: "center", sm: "center", lg: "normal" }}
          textAlign={{ base: "center", sm: "center", lg: "center" }}
          fontWeight="medium"
          color={useColorModeValue("#0d6efd", "white")}
        >
          With Just a Click, You can Transfer your Vested Options to another
          Employee
        </Text>
        <Image
          src={HandShake}
          alt="HandShake"
          boxSize={{ base: "100px", md: "100px", lg: "100px" }}
        />
        <Text
          fontSize={{ base: "smaller", md: "small", lg: "xl" }}
          alignSelf={{ base: "center", sm: "center", lg: "normal" }}
          textAlign={{ base: "center", sm: "center", lg: "center" }}
          fontWeight="medium"
          color={useColorModeValue("#0d6efd", "white")}
        >
          Abstraction and Delegation
        </Text>
        <Text
          noOfLines={{ base: 2, sm: 3, lg: 3 }}
          fontSize={{ base: "10px", sm: "smaller", lg: "smaller" }}
          fontWeight="medium"
          width={{ base: "70%", lg: "50%" }}
          textAlign="center"
          color={useColorModeValue("#0d6efd", "white")}
          opacity="50%"
        >
          Ability to Delegate Stock Options and thus still partake in all
          activity the ownership of the said amount of stocks grants you Ability
          to Assign Stocks to Stock Managers, to Manage the Stocks just the way
          it is currently done in TradFi and thus you can get your dividends
          maintaining the Status Quo
        </Text>
        <Text
          mt="15px"
          fontSize={{ base: "smaller", md: "small", lg: "xl" }}
          alignSelf={{ base: "center", sm: "center", lg: "normal" }}
          textAlign={{ base: "center", sm: "center", lg: "center" }}
          fontWeight="medium"
          color={useColorModeValue("#0d6efd", "white")}
        >
          Zero Discrimination, Equal Access, Assured Security
        </Text>
        <Image
          src={Team}
          alt="team"
          boxSize={{ base: "200px", md: "200px", lg: "200px" }}
        />
      </Flex>
    </Container>
  );
}
