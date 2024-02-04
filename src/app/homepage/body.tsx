import {
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  Text,
  Box,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import home from "../../../public/home.svg";
import HomeCard from "@/components/homeCard";
import WageSvg from "../../../public/wage.svg";
import Nft from "../../../public/nft.jpg";
import Stock from "../../../public/stock.svg";
import Crm from "../../../public/crm.svg";
import Tax from "../../../public/tax.jpg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Body() {
  return (
    <Container as="section" maxWidth="100%" display="grid">
      {/* <Grid templateColumns="repeat(2, 1fr)" gap={6} p={5} marginTop={100}>
        <GridItem
          w="100%"
          bg="blue.100"
          justifyContent="center"
          justifyItems="center"
        >
          <Heading>Welcome to</Heading>
          <Heading size="4xl" fontWeight="bold">
            Periwnkl
          </Heading>
        </GridItem>
        <GridItem w="100%" bg="transparent">
          <Center>
            <Image alt="HomePage" src={home} />
          </Center>
        </GridItem>
      </Grid> */}

      <SimpleGrid spacing={5} minChildWidth="250px" mt="5vh">
        <GridItem
          bg="transparent"
          padding={{ base: "20px", md: "25px", lg: "120px" }}
          textAlign={{ base: "center", md: "left", lg: "left" }}
        >
          <GridItem pl={{ sm: "30px", md: "50px", lg: "200px" }}>
            <Heading
              py="5px"
              color={useColorModeValue("#0d6efd", "white")}
              fontSize={{ base: "10px", md: "10px", lg: "40px" }}
              fontWeight="50%"
            >
              Welcome to
            </Heading>
          </GridItem>
          <GridItem pl={{ sm: "30px", md: "50px", lg: "200px" }}>
            <Heading
              size="4xl"
              fontSize={{ base: "35px", lg: "100px" }}
              fontWeight="bold"
              color={useColorModeValue("#0d6efd", "white")}
             
            >
              <h1>Periwnkl</h1>
            </Heading>
          </GridItem>
        </GridItem>
        <GridItem w="100%" bg="transparent" pr={{ md: "50px", lg: "200px" }}>
          <Center>
            <Image alt="HomePage" src={home} />
          </Center>
        </GridItem>
      </SimpleGrid>

      <Box
        height="50px"
        width="100%"
        display="flex"
        bg={useColorModeValue("#0dedfd", "#0dedfd")}
        justifyContent="center"
        marginY="20px"
      >
        <Text
          textAlign="center"
          fontSize={{ base: "5px", md: "5px", lg: "20px" }}
          color={useColorModeValue("#0d6efd", "#0d6efd")}
          alignSelf="center"
        >
          Why do anything any other way ? Just Wink it
        </Text>
      </Box>

      <SimpleGrid
        templateColumns={{base: 'repeat(1, 1fr)',md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}}
        minChildWidth="250px"
        mt={{ base: "5px", md: "5px", lg: "5px" }}
        mb='10px'
        spacing={5}
        width='70%'
        justifySelf='center'
      >
        <HomeCard image={Nft} nameOfCard="Marketplace" active={true} />
        <HomeCard image={Stock} nameOfCard="StockOptions" active={true} />
        <HomeCard image={WageSvg} nameOfCard="WagePay" active={true} />
        <HomeCard image={Crm} nameOfCard="CRM" active={false} />
        <HomeCard image={Tax} nameOfCard="Tax Manager" active={false} />
      </SimpleGrid>

     
    </Container>
  );
}
