"use client";
import { Box, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {} from "viem";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import ListBox from "@/components/listComponent";
import { useEthersSigner } from "@/hooks/adapter2";
import { Image } from "@chakra-ui/next-js";
import NoData from "../../../../public/noData.jpg";
import {
  GetNumberOfEmployee,
  GetOrgName,
  SearchForOrganisation,
} from "@/hooks/stockContracts";

interface EmployeeData {
  name: string;
  address: string;
  emp: number;
}

export default function Page() {
  const [mounted, setMounted] = useState(false);

  const [resultLoading, setResultLoading] = useState(true);
  const { isConnected } = useAccount();
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  const router = useRouter();

  const signer = useEthersSigner();
  const address = signer?._address;
  useEffect(() => {
    setTimeout(() => {
      if (isConnected) {
        setMounted(true);
      }
    }, 2000); // 2000 milliseconds = 2 seconds
  }, [isConnected]);
  useEffect(() => {
    const fetchData = async () => {
      setResultLoading(true);
      try {
        //cache
        const cache = await caches.open("my-cache");
        const cachedResponse = await cache.match("employee-organisation-data");
        if (isConnected && mounted) {
          if (cachedResponse) {
            const data = await cachedResponse.json();
            setEmployeeData(data);
          }
        }

        const listResult = await SearchForOrganisation(address!, signer!);
        const data = await Promise.all(
          listResult.map(async (orgAddress: string) => {
            const empCount = await GetNumberOfEmployee(orgAddress, signer!);
            const name_ = await GetOrgName(orgAddress, signer!);
            return {
              name: name_,
              address: orgAddress,
              emp: empCount,
            };
          })
        );

        await cache.put(
          "employee-organisation-data",
          new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          })
        );

        setResultLoading(false);
        setEmployeeData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setResultLoading(false);
      }
    };
    if (isConnected && mounted) {
      fetchData();
    }
  }, [isConnected, mounted]);

  return (
    <Container minHeight="80vh">
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
        {resultLoading && isConnected && mounted && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#0d6efd"
            size="xl"
            mb={4}
          />
        )}

        {isConnected && employeeData.length >= 1 ? (
          employeeData.map((data, index) => (
            <div
              onClick={() =>
                router.push(`/stock/employee/${data.address}/${address}`)
              }
              key={index}
            >
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
