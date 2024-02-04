// "use client"
// import { useContractWrite, usePrepareContractWrite} from "wagmi";
// import {parseEther} from 'viem'
// import StockFactory from '../app/stock/constants/StockOptionsFactory.json'


// const ContractFactoryAddress = "0x88eFdaC29E3Ba290512E26c04908692Ae9810566";

// const { config } = usePrepareContractWrite({
//   address: ContractFactoryAddress,
//   abi: StockFactory.abi,
//   functionName: "createStockOptionsPlan",
// });

// const {
//   write: createStockOptionsPlan,
//   isSuccess,
//   isLoading,
//   isError,
//   error,
// } = useContractWrite(config);
// export async function CreateStockOptionsPlan(){
//     return createStockOptionsPlan
// }