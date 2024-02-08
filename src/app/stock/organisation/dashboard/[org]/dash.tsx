"use client";
import {
  Container,
  SimpleGrid,
  Text,
  Button,
  Grid,
  GridItem,
  Box,
  FormControl,
  Input,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Skeleton,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { BiTime } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsBank } from "react-icons/bs";
import { LiaSuitcaseSolid } from "react-icons/lia";
import ListBox from "@/components/listComponent";
import ListEmployee from "@/components/listEmployee";
import { useCallback, useState, SyntheticEvent, useEffect } from "react";
import {
  AddEmployee,
  GetGrossExcercisedOptions,
  GetGrossVestedOptions,
  GetNumberOfEmployee,
  GetOrgName,
  GetPieData,
  GetTimeStamp,
  ListOfEmployees,
} from "@/hooks/stockContracts";
import { useAccount } from "wagmi";
import { checkIfValidAddress } from "@/utils/contractUtil";
import { ethers } from "ethers";
import { Piechart } from "@/components/pieChart";
import { useEthersSigner } from "@/hooks/adapter2";

interface DashProps {
  address: string;
}

interface PieData {
  color: string;
  title: string;
  value: number;
}

export default function Dashboard(props: DashProps) {
  const [list, setList] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [pieLoading, setPieLoading] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [empAmount, setEmpAmount] = useState(Infinity);
  const [data, setData] = useState<PieData[]>([]);
  const [grossExcercised, setGrossExcercised] = useState(Infinity);
  const [grossVested, setGrossVested] = useState(Infinity);
  const [addLoading, setAddLoading] = useState(false);
  const [addr, setAddr] = useState("");
  const [submitFail, setSubmitFail] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);

  const router = useRouter();
  const signer = useEthersSigner();

  const { isConnected } = useAccount();

  const allValuesZero = data.every((item) => item.value === 0);

  const FetchData = useCallback(async () => {
    try {
      if (isConnected) {
        console.log("fetch called");
        setPieLoading(true);
        const _name = await GetOrgName(props.address, signer!);
        setName(_name);
        setAddress(props.address);
        const date = await GetTimeStamp(props.address, signer!);
        setDate(date);
        const listEmployees = await ListOfEmployees(props.address, signer!);
        setList(listEmployees);
        const empAmount = await GetNumberOfEmployee(props.address, signer!);
        setEmpAmount(empAmount);
        const result = await GetPieData(props.address, signer!);
        setData(result);
        
        const grossExcercised = await GetGrossExcercisedOptions(
          props.address,
          signer!
        );
        setGrossExcercised(grossExcercised);
        const grossVested = await GetGrossVestedOptions(props.address, signer!);
        setGrossVested(grossVested);
        setPieLoading(false);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setPieLoading(false);
    }
  }, [props, isConnected]);

  useEffect(() => {
    if (isConnected && mounted) {
      FetchData();
    }
    setList;
    if (submitFail == true) {
      setTimeout(() => {
        setSubmitFail(false);
      }, 5000);
    }
  }, [props, isConnected, mounted, setList, FetchData, submitFail]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const addr_ = addr?.toString().trim();
    if (isConnected) {
      setAddLoading(true);
      try {
        if (checkIfValidAddress(addr_) && ethers.utils.isAddress(addr_)) {
          const add_ = await AddEmployee(addr_, props.address, signer!);
          console.log(add_);
        } else {
          setSubmitFail(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAddLoading(false);
        FetchData;
      }
    }
  }

  return (
    <Container
      as="section"
      display="flex"
      width="100vw"
      minHeight="70vh"
      justifyContent="center"
      alignContent="center"
    >
      <SimpleGrid>
        <Text
          bgColor="#0d6efd"
          width="70vw"
          rounded={4}
          height="30px"
          verticalAlign="center"
          textAlign="center"
          color="white"
          mt={5}
          fontWeight="bold"
        >
          Props.address
        </Text>
        <Button
          display={{ base: "none", lg: "flex" }}
          size="sm"
          width="10%"
          mt={3}
          colorScheme="green"
        >
          <IoMdArrowRoundBack />
          Back
        </Button>
        <Grid width="70vw" templateColumns="repeat(3, 1fr)" gap={5} mt={5}>
          <GridItem
            as="aside"
            display="flex"
            colSpan={{ base: 3, lg: 1 }}
            height={{ base: "70vh", lg: "70vh" }}
            boxShadow="2xl"
            rounded="50px"
            flexDirection="column"
            padding="0"
          >
            <Box
              display="flex"
              width="100%"
              height="50px"
              roundedTop="50px"
              bgColor="#0d6efd"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                color="white"
                textAlign="center"
                verticalAlign="center"
                fontWeight="bold"
              >
                Employees
              </Text>
            </Box>
            <Stack
              direction="column"
              mt={5}
              width="70%"
              maxWidth="70%"
              display="flex"
              alignSelf="center"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              justifyItems="center"
            >
              <form onSubmit={handleSubmit}>
                <FormControl
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  autoFocus
                >
                  <Input
                    border="solid 2px"
                    borderColor="#0d6efd"
                    placeholder="0x0000"
                    justifySelf="center"
                    width="200px"
                    onChange={(e) => setAddr(e.target.value)}
                    required
                    disabled={!isConnected || addLoading || !mounted}
                  ></Input>
                  <Button
                    display="flex"
                    width="150px"
                    mt={3}
                    colorScheme="blue"
                    bgColor="#0d6efd"
                    type="submit"
                    alignSelf="center"
                    isLoading={addLoading}
                    disabled={!isConnected || addLoading || !mounted}
                  >
                    Add
                  </Button>
                </FormControl>
              </form>
            </Stack>
            <Box
              mt={5}
              width="80%"
              height={{ base: "60%", lg: "80%" }}
              display="flex"
              justifySelf="center"
              flexDirection="column"
              alignSelf="center"
              overflowY="scroll"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {list.map((data, index) => (
                <ListEmployee
                  onClick={() =>
                    router.push(
                      `/stock/organisation/dashboard/${address}/${data}`
                    )
                  }
                  key={index++}
                  id={index + 1}
                  address={data}
                />
              ))}
            </Box>
          </GridItem>
          <GridItem
            as="aside"
            colSpan={{ base: 3, lg: 2 }}
            height={{ base: "50vh", lg: "70vh" }}
            boxShadow="2xl"
            rounded="50px"
            display={{ base: "none", lg: "flex" }}
            flexDirection="column"
            borderTop="solid 2px"
            borderTopColor="#0d6efd"
          >
            <SimpleGrid
              mt={5}
              width="100%"
              height="150px"
              templateColumns="repeat(2, 1fr)"
            >
              <Box
                aria-colspan={1}
                display="flex"
                justifySelf="center"
                bgColor="white"
                border="solid 2px"
                borderColor="#47817E"
                borderLeft="solid 10px"
                borderLeftColor="#47817E"
                width="70%"
                height="70px"
                roundedRight="50px"
                alignItems="center"
                paddingLeft="10px"
                alignContent="left"
                justifyContent="left"
                color="#47817E"
                mb={3}
              >
                {" "}
                <BiTime
                  style={{ transform: "scale(1.5)", marginRight: "10px" }}
                />{" "}
                <Text
                  textAlign="left"
                  fontWeight="bold"
                  noOfLines={1}
                  display="flex"
                  flexDirection="row"
                >
                  Block Time:{" "}
                  {isConnected && mounted && pieLoading ? (
                    <Skeleton height="20px" width="5px" />
                  ) : date == "" ? (
                    0
                  ) : (
                    date
                  )}
                </Text>
              </Box>
              <Box
                aria-colspan={1}
                display="flex"
                justifySelf="center"
                bgColor="white"
                border="solid 2px"
                borderColor="#CB3D9D"
                borderLeft="solid 10px"
                borderLeftColor="#CB3D9D"
                width="70%"
                height="70px"
                roundedRight="50px"
                alignItems="center"
                paddingLeft="10px"
                alignContent="left"
                justifyContent="left"
                color="#CB3D9D"
                mb={3}
              >
                {" "}
                <CgProfile
                  style={{ transform: "scale(1.5)", marginRight: "10px" }}
                />{" "}
                <Text
                  textAlign="left"
                  fontWeight="bold"
                  noOfLines={1}
                  display="flex"
                  flexDirection="row"
                >
                  Total Employees:{" "}
                  {isConnected && mounted && pieLoading ? (
                    <Skeleton height="20px" width="5px" />
                  ) : empAmount == Infinity ? (
                    0
                  ) : (
                    empAmount
                  )}
                </Text>
              </Box>
              <Box
                aria-colspan={1}
                display="flex"
                justifySelf="center"
                bgColor="white"
                border="solid 2px"
                borderColor="#FF8B75"
                borderLeft="solid 10px"
                borderLeftColor="#FF8B75"
                width="70%"
                height="70px"
                roundedRight="50px"
                alignItems="center"
                paddingLeft="10px"
                alignContent="left"
                justifyContent="left"
                color="#FF8B75"
                mb={3}
              >
                {" "}
                <LiaSuitcaseSolid
                  style={{ transform: "scale(1.5)", marginRight: "10px" }}
                />{" "}
                <Text
                  textAlign="left"
                  fontWeight="bold"
                  noOfLines={1}
                  display="flex"
                  flexDirection="row"
                >
                  Gross Excercised Options:{" "}
                  {isConnected && mounted && pieLoading ? (
                    <Skeleton height="20px" width="5px" />
                  ) : grossExcercised == Infinity ? (
                    0
                  ) : (
                    grossExcercised
                  )}
                </Text>
              </Box>
              <Box
                aria-colspan={1}
                display="flex"
                justifySelf="center"
                bgColor="white"
                border="solid 2px"
                borderColor="#ED004A"
                borderLeft="solid 10px"
                borderLeftColor="#ED004A"
                width="70%"
                height="70px"
                roundedRight="50px"
                alignItems="center"
                paddingLeft="10px"
                alignContent="left"
                justifyContent="left"
                color="#ED004A"
                mb={3}
              >
                {" "}
                <BsBank
                  style={{ transform: "scale(1.5)", marginRight: "10px" }}
                />{" "}
                <Text
                  textAlign="left"
                  fontWeight="bold"
                  noOfLines={1}
                  display="flex"
                  flexDirection="row"
                >
                  Gross Vested Options:{" "}
                  {isConnected && mounted && pieLoading ? (
                    <Skeleton height="20px" width="5px" />
                  ) : grossVested == Infinity ? (
                    0
                  ) : (
                    grossVested
                  )}
                </Text>
              </Box>
            </SimpleGrid>
            <Box mt="25px" height="5px" width="100%" bgColor="#FF5D7A"></Box>
            {pieLoading && isConnected && (
              <Spinner
                display="flex"
                mt={3}
                alignSelf="center"
                size="xl"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#47817E"
              />
            )}

            {!pieLoading && isConnected && mounted && (
              <>
                {allValuesZero ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>
                      All Employees currently do not have Stock Options
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Piechart data={data} /> && (
                    <Text
                      mt={3}
                      bgColor="#0d6efd"
                      width="50%"
                      rounded={5}
                      color="white"
                      textAlign="center"
                      justifySelf="center"
                      alignSelf="center"
                    >
                      Employee StockOptions InfoGraph
                    </Text>
                  )
                )}
              </>
            )}
          </GridItem>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
