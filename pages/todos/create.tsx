import { ChakraProvider, theme } from "@chakra-ui/react";
import Header from "../../components/Header";

const Create = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <h1>Create something.</h1>
    </ChakraProvider>
  );
};

export default Create;
