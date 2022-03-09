import { ChakraProvider, theme } from "@chakra-ui/react";
import Header from "../components/Header";

export default function signIn() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <h1>Signin here.</h1>
    </ChakraProvider>
  );
}
