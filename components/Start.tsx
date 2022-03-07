import { Button, ChakraProvider, Stack } from "@chakra-ui/react";
import theme from "../pages/Theme";

const Start = () => {
  return (
    <div style={{ margin: "100px 0" }}>
      <Stack style={{ width: "800px", margin: "0 auto" }}>
        <Button
          color="white"
          bg="blue.300"
          _hover={{ background: "blue.600" }}
          style={{ width: "200px", margin: "0 auto" }}
        >
          <a href="/edit">START</a>
        </Button>
      </Stack>
    </div>
  );
};

export default Start;
