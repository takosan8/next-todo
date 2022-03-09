import { ChakraProvider, theme } from "@chakra-ui/react";
import Header from "../components/Header";

export default function signup() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <h1>Signup here.</h1>
    </ChakraProvider>
  );
}
