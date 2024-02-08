import { ethers } from "ethers";

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 6) + "..." + addr.substring(addr.length - 4)}`;
};
export const shortenAddress = (addr: string) => {
  return `${addr.substring(0, 20) + "..." + addr.substring(addr.length - 4)}`;
};

export const checkIfValidAddress = (address: string) => {
  console.log("checking if is valid ", address);
  try {
    console.log("this is the length", address.length);
    if (
      address.length != 42 ||
      !address.startsWith("0x") ||
      ethers.utils.isAddress(address) == false
    ) {
      console.log("false");
      return false;
    }
    console.log("true");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const switchNetwork = async () => {
  try {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xe704" }],
    });
    // refresh
    window.location.reload();
  } catch (error) {
    console.error("something went wrong", error);
  }
};

enum colorFactory {
  "#0d6efd",
  "#f6c23e",
  "#85bfcd",
  "#ff6f61",
  "#FF0000",
  "#FFA500",
  "#4B0082",
  "#EE82EE",
  "#000000",
  "#808080",
}

export function ReturnColor(index: number) {
  if (index == 1) {
    return colorFactory[1];
  } else if (index == 2) {
    return colorFactory[2];
  } else if (index == 3) {
    return colorFactory[3];
  } else if (index == 4) {
    return colorFactory[4];
  } else {
    return colorFactory[index % 10];
  }
}
