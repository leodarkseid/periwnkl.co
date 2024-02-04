import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../../theme";

import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "./navbar";
import PreFooter from "./preFooter";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Periwnkl",
  description: "Periwnkl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
          <PreFooter />
          <Footer />
        </Providers>
      </body>
    </html>
  );
 
}
