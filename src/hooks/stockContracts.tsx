
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { parseEther } from "viem";
import { ethers, Contract, BigNumber } from "ethers";
import StockFactory from "../app/stock/constants/StockOptionsFactory.json";
import stock from "../app/stock/constants/EmployeeStockOptionPlan.json";
// import { useEthersSigner } from "@/hooks/adapter2";
import { ReturnColor } from "@/utils/contractUtil";

const ContractFactoryAddress = "0x9d0E31a2f4516a8b2B7CBB92642274E499f5A1f2";


async function getListed(signer: ethers.providers.JsonRpcSigner) {
  const { isConnected } = useAccount();
  if (isConnected && signer) {
    const contract = new Contract(
      ContractFactoryAddress,
      StockFactory.abi,
      signer
    );
    console.log("get listed got called");
    return await contract.getCreatorDeployedContracts();
  }
}

export function soContract(
  soAddress: string,
  signer: ethers.providers.JsonRpcSigner
): Contract {
  return new Contract(soAddress, stock.abi, signer);
}

export async function GetStockOptionsAmount(
  employeeAddress: string,
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  
  const contract = soContract(contractAddress, signer);
  const a = await contract.getEmployee(employeeAddress);
  const amount = ethers.utils.formatEther(a.stockOptions.toString());
  console.log(amount);
  return Number(amount);
}

export async function GetPieData(
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const listResult = await ListOfEmployees(contractAddress, signer);
  const data = await Promise.all(
    listResult.map(async (addressObj: string, index: number) => {
      const stockAmount = await GetStockOptionsAmount(addressObj,contractAddress, signer);
      const color = ReturnColor(index++);
      return {
        color: color,
        title: addressObj,
        value: stockAmount,
      };
    })
  );
  return data;
}

export async function GetOrgName(
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(contractAddress, signer);
  const name = await contract.name();
  return name;
}

export async function GetTimeStamp(
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(contractAddress, signer);
  const time = await contract.getBlockTimeStamp();

  const timeStamp = time;
  const date = new Date(timeStamp * 1000);
  return date.toLocaleString(undefined, { dateStyle: "medium" });
}

export async function GetNumberOfEmployee(
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(contractAddress, signer);
  const getNumber: BigNumber = await contract.getTotalEmployees();
  return getNumber.toNumber();
}

export async function ListOfEmployees(
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(contractAddress, signer);
  const _total = await GetNumberOfEmployee(contractAddress, signer);
  const total = Number(_total);
  const listOfEmployees = [];
  for (let i = 0; i < total; i++) {
    const id = i;
    const employee = await contract.employees(id);
    listOfEmployees.push(employee);
  }
  return listOfEmployees;
}

export async function ExcercisedOptions(
  address: string,
  employeeAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  let vs: number = 0;
  try {
    const contract = soContract(address, signer);
    const _vs: BigNumber = await contract.getExcercisedOptions(employeeAddress);
    vs = _vs.toNumber();
  } catch (error) {
    console.error("from exercised options", error);
  }
  return vs;
}

export async function GetGrossExcercisedOptions(
  address: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(address, signer);
  const list = await ListOfEmployees(address, signer);
  let total = 0;
  for (const i of list) {
    const vs = await ExcercisedOptions(address, i, signer);
    total += vs;
  }
  return total;
}

export async function GetGrossVestedOptions(
  address: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(address, signer);
  const list = await ListOfEmployees(address, signer);
  let total = 0;
  for (const i of list) {
    const vs = await VestedOptions(address, i, signer);
    total += vs;
  }
  return total;
}

export async function VestedOptions(
  address: string,
  employeeAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  let vs: number = 0;
  try {
    const contract = soContract(address, signer);
    const _result = await contract.getVestedOptions(employeeAddress);
    const result = Number(ethers.utils.formatEther(_result.toString()));
    vs = result;
  } catch (error) {
    console.error("from vested options", error);
  }
  return vs;
}

export async function AddEmployee(
  employee: string,
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner
) {
  try {
    const contract = soContract(contractAddress, signer);
    const add = await contract.addEmployee(employee);
    const addReceipt = add.wait();
    return addReceipt;
  } catch (error) {
    console.error(error);
  }
}

export async function GrantOptions(
  organisationAddress: string,
  employeeAddress: string,
  amount: number,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(organisationAddress, signer);
  const _amount = ethers.utils.parseEther(amount.toString());
  const grant = await contract.grantStockOptions(employeeAddress, _amount);
  const grantTx = await grant.wait();
  return grantTx;
}

export async function SetScheduleOptions(
  organisationAddress: string,
  employeeAddress: string,
  time: string,
  signer: ethers.providers.JsonRpcSigner
) {
  const contract = soContract(organisationAddress, signer);
  const timestamp = new Date(time).getTime();
  const _timestamp = timestamp / 1000;
  console.log("time stamp is ", _timestamp);

  const grant = await contract.setVestingSchedule(employeeAddress, _timestamp);
  const grantTx = await grant.wait();
  return grantTx;
}

interface CountdownProp {
  days: number;
  hours: number;
  minutes: number;
}

export async function GetVestingCountdown(
  organisationAddress: string,
  employeeAddress: string,
  signer: ethers.providers.JsonRpcSigner
): Promise<CountdownProp> {
  try {
    const contract = soContract(organisationAddress, signer);
    const vestingCountdown = await contract.vestingCountdown(employeeAddress);
    const days = Math.floor(vestingCountdown / (24 * 60 * 60));
    const hours = Math.floor((vestingCountdown % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((vestingCountdown % (60 * 60)) / 60);
    const data = { days, hours, minutes };
    return data;
  } catch (error) {
    console.error("countdown error", error);
    return { days: 0, hours: 0, minutes: 0 };
  }
}

export function ContractFactory(signer: ethers.providers.JsonRpcSigner): Contract {
  return new Contract(
    ContractFactoryAddress,
    StockFactory.abi,
    signer
  );
}

export async function SearchForOrganisation(
  employeeAddress: string,
  signer: ethers.providers.JsonRpcSigner
): Promise<string[]> {
  console.log("called search");
  console.log("signer", signer, "signer")
  let listOfOrgs: string[] = [];
  const contract = ContractFactory(signer);
  const listOfContracts: Array<string> =
    await contract.getDeployedStockOptions();
  await Promise.all(
    listOfContracts.map(async (org) => {
      console.log("sorting through orgs", org);
      if (await checkIfAnEmployee(org, employeeAddress, signer)) {
        listOfOrgs.push(org);
      }
    })
  );
  return listOfOrgs;
}

async function checkIfAnEmployee(
  organisationAddress: string,
  employeeAddress: string,
  signer: ethers.providers.JsonRpcSigner
): Promise<boolean> {
  const contract = soContract(organisationAddress, signer);
  const isEmployee: boolean = await contract.isEmployee(employeeAddress);
  return isEmployee;
}

export async function Transfer(
  organisationAddress: string,
  recipientAddress: string,
  amount: number,
  signer: ethers.providers.JsonRpcSigner
) {
  try {
    const temp: string = amount.toString();
    const _amount = ethers.utils.parseEther(temp);
    const contract = soContract(organisationAddress, signer);
    const transfer = await contract.transferOptions(recipientAddress, _amount);
    const transferTx = await transfer.wait();
    return transferTx;
  } catch (error) {
    console.error("transfer error", error);
  }
}