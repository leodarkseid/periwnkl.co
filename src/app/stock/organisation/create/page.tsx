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
Flex
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

import { ethers } from "ethers";
import { Contract } from "ethers";
import { useEthersProvider } from "@/hooks/adapter1";
import { useEthersSigner } from "@/hooks/adapter2";

const ContractFactoryAddress = "0x9d0E31a2f4516a8b2B7CBB92642274E499f5A1f2";

interface EmployeeData {
  name: string;
  address: string;
  emp: number;
}

export default function Create() {
  const [mounted , setMounted] = useState(false);
  useEffect(() => setMounted(true), [])
  const [name, setName] = useState("");
  const [stockOptions, setStockOptions] = useState(0);
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
   const signer = useEthersSigner()
  //  console.log(signer)
  const contract = new Contract(
    ContractFactoryAddress, 
    StockFactory.abi,
    signer
  )

  async function d(){
    const ans = await contract.getDeployedStockOptions();
    return ans;
  }

  useEffect(()=>{
    async function f(){
if(isConnected){console.log( await d())}
    }
    f()
  }, [isConnected])
  
  

  
//   function d(){
//   const {refetch:Re} = useContractRead({
//     address: ContractFactoryAddress,
//     abi: [
//       {
       
//         name: "getCreatorDeployedContracts",
//         outputs: [
//           {
//             components: [
//               {
//                 internalType: "string",
//                 name: "name",
//                 type: "string",
//               },
//               {
//                 internalType: "address",
//                 name: "newContractAddress",
//                 type: "address",
//               },
//             ],
            
//             name: "",
//             type: "tuple[]",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//     ],
//     functionName: 'getCreatorDeployedContracts',
//     watch:true
    
//   });
//   return Re
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
  //     watch: true
  //   });
  //   return contractRead     ;
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
  
useEffect( ()=>{
  
  const fetchData = async () => {
    //cache
    const cache = await caches.open('my-cache')
    const cachedResponse = await cache.match("employee-data");
    if (cachedResponse) {
      // If the data is cached, use it
      const data = await cachedResponse.json();
      setEmployeeData(data);
    }

  

    // const newData:any = Data
    // console.log(Data)
  //   if(Data){
  //     const data = await Promise.all(
  //     newData.map((addressObj: { newContractAddress: string; name: any; })=>{
  //       let tempAddress: `0x${string}` =
  //         addressObj.newContractAddress as `0x${string}`;
  //       const empCount = getTotalAmount(tempAddress);
  //       console.log("emp",empCount)
  //       return {
  //         name: addressObj.name,
  //         address: addressObj.newContractAddress,
  //         emp: empCount,
  //       };
  //     }));
  //     setEmployeeData(data);

  //     //set in cache
  //     await cache.put(
  //       'emplyee-data',
  //       new Response(JSON.stringify(data), {
  //         headers: {'Content-Type':'application/json'}
  //       })
  //     )
  //   }
  }
  fetchData();
  
}, [mounted,transferError, transferData])

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
              onChange={(e) => setName(e.target.value)}
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

      <Flex>
        { (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        { (
          <Box
            width="100%"
            py={2}
            rounded="5px"
            justifyContent="center"
            bgColor="#0d6efd"
          >
            <Text mb={5} fontWeight="bold" textAlign="center">
              List of Organisations
            </Text>

            {employeeData.map((data, index) => (
              <div key={index}>
                <ListBox
                  key={index}
                  name={data.name}
                  address={data.address}
                  emp={data.emp}
                />
              </div>
            ))}
          </Box>
        )}
      </Flex>
    </Container>
  );
}
