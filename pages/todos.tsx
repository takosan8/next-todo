import React from "react";
import {
  Stack,
  Center,
  Flex,
  Heading,
  Button,
  ChakraProvider,
  OrderedList,
  ListItem,
  Input,
  Checkbox,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import theme from "./Theme";
import Header from "../components/Header";
import Link from "next/link";

const Todos = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
    </ChakraProvider>
  );
};

export default Todos;
