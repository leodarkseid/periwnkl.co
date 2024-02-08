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
  VestedOptions,
} from "@/hooks/stockContracts";
import { useEthersSigner } from "@/hooks/adapter2";

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
  const [grantSubmitLoading, setGrantSubmitLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);
  const [grantOptions, setGrantOptions] = useState(0);
  const [scheduleSubmitLoading, setScheduleSubmitLoading] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [countdownLoading, setCountDownLoading] = useState(false);
  const [sPLoading, setSpLoading] = useState(false);
  const [vestLoading, setVestLoading] = useState(false);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [stockOptions, setStockOptions] = useState(0);
  const [vestedOptions, setVestedOptions] = useState(0);
  const [excercisedOptions, setExcercisedOptions] = useState(0);
  const [countdown, setCountdown] = useState<CountdownProp>();
  const [alertCountdown, setAlertCountdown] = useState(false);

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
      FetchData();
    }
  }, [empAddr, mounted, orgAddr]);

  async function HandleGrantOptionSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (isConnected && mounted) {
      try {
        setGrantSubmitLoading(true);
        const submit = await GrantOptions(
          orgAddr,
          empAddr,
          grantOptions,
          signer!
        );
        console.log(submit);
      } catch (error) {
        console.error(error);
      } finally {
        setGrantSubmitLoading(false);
      }
    }
  }
  async function HandleScheduleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setScheduleSubmitLoading(true);
    if (isConnected && mounted) {
      try {
        console.log("should submit");
        console.log("from HandleScheduleSubmit", schedule);
        const submit = await SetScheduleOptions(
          orgAddr,
          empAddr,
          schedule,
          signer!
        );
        console.log(submit);
      } catch (error) {
        console.error(error);
      } finally {
        setScheduleSubmitLoading(false);
      }
    }
  }
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
            display={{base:"none", lg:"flex"}}
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
                  <Spinner />
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
                  <Spinner />
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
                  <Spinner />
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
              border="solid 3px"
              borderBottom="solid 10px"
              borderBottomColor="#0d6efd"
              rounded={10}
              borderColor="#0d6efd"
              color="#0d6efd"
              fontWeight="bold"
              width="50%"
              textAlign="center"
            >
              {" "}
              Stock Options:
              {sPLoading ? (
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
              ) : (
                stockOptions
              )}
            </Box>
            <Box
              mt={3}
              border="solid 3px"
              borderBottom="solid 10px"
              borderBottomColor="#0d6efd"
              rounded={10}
              borderColor="#0d6efd"
              color="#0d6efd"
              fontWeight="bold"
              width="50%"
              textAlign="center"
            >
              {" "}
              Excercised Options:
              {exerciseLoading ? (
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
              ) : (
                excercisedOptions
              )}
            </Box>
            <Box
              mt={3}
              border="solid 3px"
              borderBottom="solid 10px"
              borderBottomColor="#0d6efd"
              rounded={10}
              borderColor="#0d6efd"
              color="#0d6efd"
              fontWeight="bold"
              width="50%"
              textAlign="center"
            >
              {" "}
              Vested Options:
              {vestLoading ? (
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
              <form onSubmit={HandleGrantOptionSubmit}>
                <Flex
                  flexDirection={{base: "column", lg: "row"}}
                  gap="0"
                  width="100%"
                  justifyContent=" center"
                  alignContent="center"
                  height="50px"
                  justifySelf="center"
                  verticalAlign="center"
                >
                  <FormControl>
                    <Input
                      display="flex"
                      border="solid 2px"
                      borderRight="none 0px"
                      borderColor="#0d6efd"
                      placeholder="1"
                      width="100%"
                      minWidth="100%"
                      bgColor="white"
                      roundedRight={0}
                      height="50px"
                      min={1}
                      required
                      onChange={(e) => setGrantOptions(Number(e.target.value))}
                    ></Input>
                  </FormControl>
                  <Button
                    as="button"
                    display="flex"
                    colorScheme="blue"
                    bgColor="#0d6efd"
                    roundedLeft={0}
                    type="submit"
                    width="40%"
                    height="50px"
                    paddingRight={5}
                    paddingLeft={5}
                    isLoading={grantSubmitLoading}
                    disabled={!isConnected || !mounted}
                  >
                    Grant Options
                  </Button>
                </Flex>
              </form>
              <form onSubmit={HandleScheduleSubmit}>
                <Flex
                  flexDirection={{base: "column", lg: "row"}}
                  gap="0"
                  width="100%"
                  justifyContent=" center"
                  alignContent="center"
                  height="50px"
                  justifySelf="center"
                  verticalAlign="center"
                >
                  <FormControl>
                    <Input
                      display="flex"
                      border="solid 2px"
                      borderRight="none 0px"
                      borderColor="#0d6efd"
                      placeholder="1"
                      width="100%"
                      minWidth="100%"
                      bgColor="white"
                      roundedRight={0}
                      height="50px"
                      type="datetime-local"
                      onChange={(e) => setSchedule(e.target.value)}
                      required
                    ></Input>
                  </FormControl>
                  <Button
                    as="button"
                    display="flex"
                    colorScheme="blue"
                    bgColor="#0d6efd"
                    roundedLeft={0}
                    type="submit"
                    width="40%"
                    height="50px"
                    padding={3}
                    disabled={!isConnected || !mounted}
                    isLoading={scheduleSubmitLoading}
                  >
                    Set Schedule
                  </Button>
                </Flex>
              </form>
            </Flex>
          </GridItem>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
