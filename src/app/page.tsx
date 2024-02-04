"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ToggleColorMode from "@/components/ToggleColorMode";
import Homepage from "./homepage/homepage";

export default function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}
