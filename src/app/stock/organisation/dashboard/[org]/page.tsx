import { Container } from "@chakra-ui/react";
import Dashboard from "./dash";


interface PageProps {
  params: { org: string };
}

export default function Page({ params: { org } }: PageProps) {
  return (
    <div>
      <Dashboard address={{ org }.org} />
    </div>
  );
}