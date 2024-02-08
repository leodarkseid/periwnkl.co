"use client";
import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Flex,
  Grid,
  GridItem,
  Button,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAccount } from "wagmi";
import { SyntheticEvent, useState, useEffect } from "react";
import {
  ExcercisedOptions,
  GetStockOptionsAmount,
  GetVestingCountdown,
  GrantOptions,
  SetScheduleOptions,
  Transfer,
  VestedOptions,
} from "@/hooks/stockContracts";
import { useEthersSigner } from "@/hooks/adapter2";
import { checkIfValidAddress } from "@/utils/contractUtil";

interface DashProps {
  empAddress: string;
  orgAddress: string;
}

interface PieData {
  color: string;
  title: string;
  value: number;
}

interface CountdownProp {
  days: number;
  hours: number;
  minutes: number;
}

export default function Dashboard(props: DashProps) {
  const empAddr = props.empAddress;
  const orgAddr = props.orgAddress;
  const signer = useEthersSigner();
  const router = useRouter();
  const { isConnected } = useAccount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);

  const [countdownLoading, setCountDownLoading] = useState(true);
  const [sPLoading, setSpLoading] = useState(false);
  const [vestLoading, setVestLoading] = useState(false);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [stockOptions, setStockOptions] = useState(0);
  const [vestedOptions, setVestedOptions] = useState(0);
  const [excercisedOptions, setExcercisedOptions] = useState(0);
  const [countdown, setCountdown] = useState<CountdownProp>();
  const [alertCountdown, setAlertCountdown] = useState(false);
  const [vestable, setVestable] = useState(0);
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [transferLoading, setTransferLoading] = useState(false);
  const [invalidData, setInvalidData] = useState(false);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const _amount = amount;
    const _address = recipient?.toString().trim();
    if (isConnected && mounted) {
      if (_amount != 0 && _address != "" && checkIfValidAddress(_address)) {
        try {
          setTransferLoading(true);
          setInvalidData(false);
          const transfer = await Transfer(orgAddr, empAddr, amount, signer!);

          console.log(transfer);
        } catch (error) {
          console.error("handle submit emp dash", error);
        } finally {
          setTransferLoading(false);
        }
      }
    } else {
      setInvalidData(true);
    }
  }

  useEffect(() => {
    async function FetchData() {
      setCountDownLoading(true);
      setSpLoading(true);
      setVestLoading(true);
      setExerciseLoading(true);
      const stockOpt: number = await GetStockOptionsAmount(
        empAddr,
        orgAddr,
        signer!
      );
      const vestedOpt: number = await VestedOptions(orgAddr, empAddr, signer!);
      const exercisedOpt: number = await ExcercisedOptions(
        orgAddr,
        empAddr,
        signer!
      );

      setStockOptions(stockOpt);
      setSpLoading(false);
      setVestedOptions(vestedOpt);
      setVestLoading(false);
      setExcercisedOptions(exercisedOpt);
      setExerciseLoading(false);

      const vestingCountdown: CountdownProp = await GetVestingCountdown(
        orgAddr,
        empAddr,
        signer!
      );
      setCountdown(vestingCountdown);
      setCountDownLoading(false);
      if (
        vestingCountdown.days === 0 &&
        vestingCountdown.hours === 0 &&
        vestingCountdown.minutes === 0
      ) {
        setAlertCountdown(true);
      }
    }

    if (isConnected && mounted) {
      try {
        FetchData();
      } catch (error) {
        console.error("Error", error)
      } finally {
        setVestLoading(false)
        setExerciseLoading(false);
        setCountDownLoading(false);
        setSpLoading(false);
      }
    }
  }, [empAddr, mounted, orgAddr, isConnected, signer]);

  return (
    <Container
      width="100vw"
      as="section"
      display="flex"
      justifyContent="center"
    >
      <SimpleGrid>
        <Text
          mt={5}
          rounded={3}
          height="35px"
          textAlign="center"
          color="white"
          bgColor="#0d6efd"
        >
          {props.empAddress}
        </Text>
        <Button size="sm" width="20%" mt={3} colorScheme="green">
          <IoMdArrowRoundBack />
          Back
        </Button>
        <Grid width="70vw" templateColumns="repeat(3, 1fr)" gap={5} mt={5}>
          <GridItem
            as="aside"
            display={{ base: "none", lg: "flex" }}
            colSpan={{ base: 3, lg: 2 }}
            height={{ base: "50vh", lg: "70vh" }}
            boxShadow="2xl"
            rounded="2xl"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            justifyItems="center"
            flexDirection="column"
          >
            <Box
              width="60%"
              height="40%"
              border="solid 2px"
              borderColor="#0d6efd"
              rounded={29}
              color="#0d6efd"
              display="flex"
              bgColor="transparent"
              alignSelf="center"
              justifySelf="center"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                templateColumns="33% 33% 33%"
                templateRows="70% 30%"
                rowGap="2px"
                columnGap="50px"
                justifyContent="center"
              >
                {countdownLoading ? (
                  <Spinner
                    size="xl"
                    thickness="4px"
                    speed="1.95s"
                    emptyColor="gray.200"
                    color="#0d6efd"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="content"
                    justifySelf="center"
                  />
                ) : (
                  <Text
                    fontSize="60px"
                    fontWeight="900"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="content"
                    justifySelf="center"
                  >
                    {countdown?.days}
                  </Text>
                )}
                {countdownLoading ? (
                  <Spinner
                    size="xl"
                    thickness="4px"
                    speed="1.95s"
                    emptyColor="gray.200"
                    color="#0d6efd"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="content"
                    justifySelf="center"
                  />
                ) : (
                  <Text
                    fontSize="60px"
                    fontWeight="900"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="content"
                    justifySelf="center"
                  >
                    {countdown?.hours}
                  </Text>
                )}
                {countdownLoading ? (
                  <Spinner
                    size="xl"
                    thickness="4px"
                    speed="1.95s"
                    emptyColor="gray.200"
                    color="#0d6efd"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="content"
                    justifySelf="center"
                  />
                ) : (
                  <Text
                    fontSize="60px"
                    fontWeight="900"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="content"
                    justifySelf="center"
                  >
                    {countdown?.minutes}
                  </Text>
                )}

                <Text
                  fontSize="20px"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="center"
                  justifySelf="center"
                >
                  Days
                </Text>
                <Text
                  fontSize="20px"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="center"
                  justifySelf="center"
                >
                  Hours
                </Text>
                <Text
                  fontSize="20px"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="center"
                  justifySelf="center"
                >
                  Min
                </Text>
              </Grid>
            </Box>
            <Text
              bgColor="#0d6efd"
              rounded={20}
              width="50%"
              textAlign="center"
              color="white"
              mb="50px"
              fontWeight="bold"
            >
              Countdown For Stock Options to Vest
            </Text>

            <Box
              mt={3}
              display="flex"
              flexDirection="column"
              border="solid 3px"
              borderBottom="solid 10px"
              borderBottomColor="#0d6efd"
              rounded={10}
              borderColor="#0d6efd"
              color="#0d6efd"
              fontWeight="bold"
              width="50%"
              textAlign="center"
              justifyContent="center"
              verticalAlign="center"
            >
              {" "}
              Stock Options:
              {sPLoading ? (
                <Spinner
                  display="flex"
                  mt={3}
                  alignSelf="center"
                  size="sm"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#47817E"
                  justifySelf="center"
                  alignContent="center"
                  justifyContent="center"
                  alignItems="center"
                  justifyItems="center"
                />
              ) : (
                stockOptions
              )}
            </Box>
            <Box
              mt={3}
              display="flex"
              flexDirection="column"
              border="solid 3px"
              borderBottom="solid 10px"
              borderBottomColor="#0d6efd"
              rounded={10}
              borderColor="#0d6efd"
              color="#0d6efd"
              fontWeight="bold"
              width="50%"
              textAlign="center"
              justifyContent="center"
              verticalAlign="center"
            >
              {" "}
              Excercised Options:
              {exerciseLoading ? (
                <Spinner
                  display="flex"
                  mt={3}
                  alignSelf="center"
                  size="sm"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#47817E"
                  justifySelf="center"
                  alignContent="center"
                  justifyContent="center"
                  alignItems="center"
                  justifyItems="center"
                />
              ) : (
                excercisedOptions
              )}
            </Box>
            <Box
              mt={3}
              display="flex"
              flexDirection="column"
              border="solid 3px"
              borderBottom="solid 10px"
              borderBottomColor="#0d6efd"
              rounded={10}
              borderColor="#0d6efd"
              color="#0d6efd"
              fontWeight="bold"
              width="50%"
              textAlign="center"
              justifyContent="center"
              verticalAlign="center"
            >
              {" "}
              Vested Options:
              {vestLoading ? (
                <Spinner
                  display="flex"
                  mt={3}
                  alignSelf="center"
                  size="sm"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#47817E"
                  justifySelf="center"
                  alignContent="center"
                  justifyContent="center"
                  alignItems="center"
                  justifyItems="center"
                />
              ) : (
                vestedOptions
              )}
            </Box>
          </GridItem>
          <GridItem
            as="aside"
            colSpan={{ base: 3, lg: 1 }}
            height={{ base: "50vh", lg: "70vh" }}
            boxShadow="2xl"
            rounded="2xl"
            display="flex"
            justifyContent="center"
            alignContent="center"
            verticalAlign="center"
          >
            <Flex
              flexDirection="column"
              gap={10}
              justifyContent="center"
              maxWidth="90%"
            >
              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                gap="0"
                width="100%"
                justifyContent=" center"
                alignContent="center"
                height="50px"
                justifySelf="center"
                verticalAlign="center"
              >
                <Box
                  display="flex"
                  border="solid 2px"
                  borderRight="none 0px"
                  borderColor="#0d6efd"
                  width="66%"
                  bgColor="white"
                  roundedRight={0}
                  height="50px"
                  justifyContent="center"
                >
                  <Text
                    textAlign="center"
                    alignSelf="center"
                    alignContent="center"
                  >
                    {vestable}
                  </Text>
                </Box>
                <Button
                  as="button"
                  display="flex"
                  colorScheme="blue"
                  bgColor="#0d6efd"
                  roundedLeft={0}
                  type="submit"
                  width="33%"
                  height="50px"
                  paddingRight={5}
                  paddingLeft={5}
                  disabled={!isConnected || !mounted || vestedOptions < 1}
                >
                  Vest
                </Button>
              </Flex>

              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                gap="0"
                width="100%"
                justifyContent=" center"
                alignContent="center"
                height="50px"
                justifySelf="center"
                verticalAlign="center"
              >
                <Box
                  display="flex"
                  border="solid 2px"
                  borderRight="none 0px"
                  borderColor="#0d6efd"
                  width="66%"
                  bgColor="white"
                  roundedRight={0}
                  height="50px"
                  justifyContent="center"
                >
                  <Text
                    textAlign="center"
                    alignSelf="center"
                    alignContent="center"
                  >
                    {vestedOptions}
                  </Text>
                </Box>
                <Button
                  as="button"
                  display="flex"
                  colorScheme="blue"
                  bgColor="#0d6efd"
                  roundedLeft={0}
                  type="submit"
                  width="33%"
                  height="50px"
                  padding={3}
                  disabled={!isConnected || !mounted || vestedOptions < 1}
                >
                  Excercise
                </Button>
              </Flex>

              <form onSubmit={handleSubmit}>
                <Grid templateColumns="70% 30%" gap="0">
                  <FormControl>
                    <Input
                      display="flex"
                      bgColor="white"
                      boxShadow="0px 0px rgba(0, 0, 0, 0.4)"
                      minWidth="250px"
                      maxWidth="250px"
                      width="250px"
                      maxH="50px"
                      height="50px"
                      color="#0d6efd"
                      border="solid 2px"
                      borderColor="#0d6efd"
                      borderRight="0px"
                      alignItems="center"
                      justifyContent="center"
                      rounded={0}
                      onChange={(e) => setRecipient(e.target.value)}
                    ></Input>
                    <Input
                      display="flex"
                      bgColor="white"
                      boxShadow="0px 0px rgba(0, 0, 0, 0.4)"
                      minWidth="250px"
                      maxWidth="250px"
                      width="250px"
                      maxH="50px"
                      height="50px"
                      color="#0d6efd"
                      border="solid 2px"
                      borderColor="#0d6efd"
                      borderRight="0px"
                      alignItems="center"
                      justifyContent="center"
                      borderTop="none 0px"
                      rounded={0}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      zIndex="0.2"
                    ></Input>
                  </FormControl>
                  <Button
                    display="flex"
                    colorScheme="blue"
                    bgColor="#0d6efd"
                    boxShadow="0px 0px 10px rgba(255, 255, 255, 1)"
                    borderRadius="0 10px 10px 0"
                    color="white"
                    alignItems="center"
                    justifyContent="center"
                    maxHeight="100px"
                    height="100px"
                    cursor="pointer"
                  >
                    Transfer
                  </Button>
                </Grid>
              </form>
            </Flex>
          </GridItem>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
