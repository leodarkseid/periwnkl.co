import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {} from "wagmi";
import {} from "viem";

export default function Create() {

  return (
    <Container>
      <Box textAlign="left" mt={9}>
        <form>
          <FormControl>
            <FormLabel> Organisation Name </FormLabel>
            <Input type="name" placeholder="Enter Organisation" />
            <FormHelperText>
              You can always change the name later
            </FormHelperText>
          </FormControl>
          <FormControl mt={7}>
            <FormLabel> Total amount of stock Options </FormLabel>
            <Input type="number" placeholder="0" />
            <FormHelperText>
              You can always change the name later
            </FormHelperText>
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>
            Create
          </Button>
        </form>
      </Box>

      <Box>
        
      </Box>
    </Container>
  );
}
