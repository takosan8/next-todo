import { ChakraProvider, theme } from "@chakra-ui/react";
import Header from "../components/Header";

export default function edit() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <h1>edit here.</h1>
    </ChakraProvider>
  );
}
