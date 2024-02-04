// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../theme";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  Chain,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     zora,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
//   ],
//   [publicProvider()]
// );

const pegasus: Chain = {
  id: 1891,
  name: "Pegasus Testnet",
  network: "phoenix",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://replicator.pegasus.lightlink.io/rpc/v1"] },
    default: { http: ["https://replicator.pegasus.lightlink.io/rpc/v1"] },
  },
  blockExplorers: {
    default: { name: "Pegasus", url: "https://pegasus.lightlink.io/" },
    etherscan: { name: "Pegasus", url: "https://pegasus.lightlink.io/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
  testnet: true,
};
// const phoenix: Chain = {
//   id: 1890,
//   name: "Phoenix Mainnet",
//   network: "phoenix",
//   iconUrl: "https://example.com/icon.svg",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "ETH",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     public: { http: ["https://replicator.phoenix.lightlink.io/rpc/v1"] },
//     default: { http: ["https://replicator.phoenix.lightlink.io/rpc/v1"] },
//   },
//   blockExplorers: {
//     default: { name: "Pegasus", url: "https://phoenix.lightlink.io/" },
//     etherscan: { name: "Pegasus", url: "https://phoenix.lightlink.io/" },
//   },
//   contracts: {
//     multicall3: {
//       address: "0xca11bde05977b3631167028862be2a173976ca11",
//       blockCreated: 11_907_934,
//     },
//   },
//   testnet: false,
// };

const { publicClient, chains } = configureChains(
  [pegasus, 
    // phoenix
  ],
  [
    
    jsonRpcProvider({
      rpc: (pegasus) => ({
        http: `https://replicator.pegasus.lightlink.io/rpc/v1`,
      }),
    }),
  ]
);
const projectId = "23a5be88d8ad9d41632517ff27618773";

const { connectors } = getDefaultWallets({
  appName: "Periwnkl",
  projectId: projectId,
  chains,
});


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
