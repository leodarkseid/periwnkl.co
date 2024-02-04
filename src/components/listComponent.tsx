import { Box } from "@chakra-ui/react";
import { GoOrganization } from "react-icons/go";

interface ListCardProps {
  name: string;
  address: string;
  emp: number;
}
export default function ListBox(props: ListCardProps){
    return (
      <Box>
        <span>
          <GoOrganization />
        </span>
        <div>{props.name}</div>
        <div>{props.address}</div>

      </Box>
    );
}