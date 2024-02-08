/* eslint-disable */
"use client";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  Box,
  Button,
  Alert,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useContractRead,
  useWaitForTransaction,
  useSendTransaction,
} from "wagmi";
import {} from "viem";
import StockFactory from "../../constants/StockOptionsFactory.json";
import { SyntheticEvent, useEffect, useState } from "react";
import ListBox from "@/components/listComponent";

import { ethers, Contract, BigNumber } from "ethers";

import { useEthersSigner } from "@/hooks/adapter2";
import NoData from "../../../../../public/noData.jpg";
import { Image } from "@chakra-ui/next-js";

const ContractFactoryAddress = "0x9d0E31a2f4516a8b2B7CBB92642274E499f5A1f2";

interface EmployeeData {
  name: string;
  address: string;
  emp: number;
}

export default function Create() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);
  const [name, setName] = useState("");
  const [stockOptions, setStockOptions] = useState(0);
  const [loadingEmpData, setLoadingEmpData] = useState(false);
  const { isConnected } = useAccount();
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

  const { config } = usePrepareContractWrite({
    address: ContractFactoryAddress,
    abi: StockFactory.abi,
    functionName: "createStockOptionsPlan",

    args: [name?.toString().trim(), stockOptions],
  });

  const {
    write: createStockOptionsPlan,
    isSuccess: isTransferSuccess,
    isLoading: isTransferLoading,
    isError: isTransferError,
    error: transferError,
    data: transferData,
  } = useContractWrite(config);

  //  const provider = useEthersProvider()

  let signerX: ethers.providers.JsonRpcSigner | undefined;
  isConnected ? (signerX = useEthersSigner()) : null;
  async function getListed() {
    if (isConnected && signerX) {
      const contract = new Contract(
        ContractFactoryAddress,
        StockFactory.abi,
        signerX
      );
      console.log("get listed got called");
      return await contract.getCreatorDeployedContracts();
    }
  }

  async function getTotalFunction(contractAddress: string) {
    if (isConnected && signerX) {
      const contract = new Contract(
        contractAddress,
        [
          {
            inputs: [],
            name: "getTotalEmployees",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        signerX
      );
      const getNumber: BigNumber = await contract.getTotalEmployees();
      return getNumber.toNumber();
    }
  }

  // if(isConnected) {
  //     gcpD = useContractRead({
  //   address: ContractFactoryAddress,
  //   abi: [
  //     {
  //       inputs: [],
  //       name: "getCreatorDeployedContracts",
  //       outputs: [
  //         {
  //           components: [
  //             {
  //               internalType: "string",
  //               name: "name",
  //               type: "string",
  //             },
  //             {
  //               internalType: "address",
  //               name: "newContractAddress",
  //               type: "address",
  //             },
  //           ],
  //           internalType: "struct StockOptionsFactory.AddressName[]",
  //           name: "",
  //           type: "tuple[]",
  //         },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //   ],
  //   functionName: "getCreatorDeployedContracts",
  //   watch: true,
  // });
  // }

  // async function getTotalAmount(contractAddress: `0x${string}`) {
  //   const contractRead = useContractRead({
  //     address: contractAddress,
  //     abi: [
  //       {
  //         inputs: [],
  //         name: "getTotalEmployees",
  //         outputs: [
  //           {
  //             internalType: "uint256",
  //             name: "",
  //             type: "uint256",
  //           },
  //         ],
  //         stateMutability: "view",
  //         type: "function",
  //       },
  //     ],
  //     functionName: "getTotalEmployees",
  //     watch: true,
  //   });
  //   return contractRead;
  // }

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: transferData?.hash,
  });

  // async function handleSubmit(e: SyntheticEvent) {
  //   console.log("handlesubmit called");
  //   e.preventDefault();

  //   if (useAccount.length >= 1) {
  //     try {
  //       console.log("should be called");
  //       const soAddress = createStockOptionsPlan?.();
  //     } catch (error) {
  //       console.error("error from create org page", error);
  //     } finally {
  //     }
  //   } else {
  //     e.stopPropagation();
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      setLoadingEmpData(true);
      //cache
      const cache = await caches.open("my-cache");
      const cachedResponse = await cache.match("employee-data");
      if (cachedResponse) {
        // If the data is cached, use it
        const data = await cachedResponse.json();
        setEmployeeData(data);
      }

      const newData: any = await getListed();
      console.log(newData);
      if (newData) {
        const data = await Promise.all(
          newData.map(
            async (addressObj: { newContractAddress: string; name: any }) => {
              let tempAddress: `0x${string}` =
                addressObj.newContractAddress as `0x${string}`;
              const empCount = await getTotalFunction(tempAddress);
              console.log("emp", empCount);
              return {
                name: addressObj.name,
                address: addressObj.newContractAddress,
                emp: empCount,
              };
            }
          )
        );
        setEmployeeData(data);

        //set in cache
        await cache.put(
          "emplyee-data",
          new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          })
        );
      }
      setLoadingEmpData(false);
    };
    if (isConnected) {
      fetchData();
    }
  }, [mounted, transferError, transferData, isConnected]);

  return (
    <Container>
      <Box textAlign="left" mt={9}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createStockOptionsPlan?.();
          }}
        >
          <FormControl>
            <FormLabel> Organisation Name </FormLabel>
            <Input
              onChange={(e) => setName(e.target.value)}
              isDisabled={!mounted || isTransferLoading || !isConnected}
              type="name"
              placeholder="Enter Organisation"
              required
            />
            <FormHelperText>
              You can always change the name later
            </FormHelperText>
          </FormControl>
          <FormControl mt={7}>
            <FormLabel> Total amount of stock Options </FormLabel>
            <Input
              onChange={(e) => setStockOptions(Number(e.target.value))}
              isDisabled={!mounted || isTransferLoading || !isConnected}
              type="number"
              placeholder="0"
              required
            />
            <FormHelperText>
              You can always change the name later
            </FormHelperText>
          </FormControl>
          <Button
            isDisabled={!mounted || isTransferLoading || !isConnected}
            type="submit"
            colorScheme="blue"
            mt={4}
            mb={4}
            isLoading={isTransferLoading}
          >
            Create
          </Button>
        </form>
      </Box>

      <Box mt={5}>
        {" "}
        {isTransferSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>New Organisation created</AlertDescription>
          </Alert>
        )}
        {isTransferError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Failed</AlertTitle>
            <AlertDescription>{}</AlertDescription>
          </Alert>
        )}
      </Box>

      <Flex
        width="100%"
        as="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {loadingEmpData && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mb={4}
          />
        )}
        {
          <Box width="100%" py={2} justifyContent="center" alignItems="center">
            <Text
              bgColor="#0d6efd"
              rounded="5px"
              mb={5}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              List of Organisations
            </Text>

            {employeeData.length >= 1 ? (
              employeeData.map((data, index) => (
                <div key={index}>
                  <ListBox
                    key={index}
                    name={data.name}
                    address={data.address}
                    emp={data.emp}
                  />
                </div>
              ))
            ) : (
              <Flex justifyContent="center">
                {" "}
                <Image
                  src={NoData}
                  alt="No Data"
                  boxSize={{ base: "200px", md: "350px", lg: "350px" }}
                  style={{ fill: "context-fill" }}
                />
              </Flex>
            )}
          </Box>
        }
      </Flex>
    </Container>
  );
}
