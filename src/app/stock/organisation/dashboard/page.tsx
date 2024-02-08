"use client";
import { Container, Box, Text, Flex, Spinner } from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import StockFactory from "../../constants/StockOptionsFactory.json";
import { Image } from "@chakra-ui/next-js";
import NoData from "../../../../../public/noData.jpg";
import { useAccount, useContractRead } from "wagmi";
import ListBox from "@/components/listComponent";
import { BigNumber, Contract, ethers } from "ethers";
import { useEthersSigner } from "@/hooks/adapter2";

const ContractFactoryAddress = "0x9d0E31a2f4516a8b2B7CBB92642274E499f5A1f2";

interface EmployeeData {
  name: string;
  address: string;
  emp: number;
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);
  const [loadingEmpData, setLoadingEmpData] = useState(false);
  const { isConnected } = useAccount();
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch interior data called");
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
      if (newData) {
        const data = await Promise.all(
          newData.map(
            async (addressObj: { newContractAddress: string; name: any }) => {
              let tempAddress: `0x${string}` =
                addressObj.newContractAddress as `0x${string}`;
              const empCount = await getTotalFunction(tempAddress);
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
    if (isConnected && mounted) {
      console.log("fetch data called");
      fetchData();
    }
    console.log("data called");
  }, [isConnected, mounted]);
  return (
    <Container minHeight="73vh">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        verticalAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          mt={5}
          bgColor="#0d6efd"
          rounded="5px"
          mb={5}
          fontWeight="bold"
          textAlign="center"
          color="white"
          width="100%"
        >
          Organisations
        </Text>
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
              boxSize={{ base: "200px", md: "350px", lg: "400px" }}
              style={{ fill: "context-fill" }}
            />
          </Flex>
        )}
      </Box>
    </Container>
  );
}
