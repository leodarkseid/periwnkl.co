"use client";
import { useState, FormEvent, SyntheticEvent, useEffect } from "react";
import Dashboard from "./dash";

import { checkIfValidAddress } from "@/utils/contractUtil";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { org: string; emp: string };
}

interface DashProp {
  empAddress: string;
  orgAddress: String;
}

export default function Page({ params: { org, emp } }: PageProps) {
  // const router = useRouter();
  // useEffect(() => {
  //   if (checkIfValidAddress({ org }.org) == false) {
  //     router.push("/notvalidquery");
  //   }
  // }, [org, router]);
  return (
    <div>
      <Dashboard empAddress={emp} orgAddress={org} />
    </div>
  );
}
