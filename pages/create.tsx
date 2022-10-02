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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";

import theme from "./Theme";

const Create = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <div className="main" style={{ margin: "10px" }}>
        <Text fontSize="4xl">タスクを新規作成</Text>
        <p>タスク名：</p>
        <input type="text" />
        <p>タスクの内容</p>
        <textarea name="todo-content" id="1" cols="60" rows="10"></textarea>
        <p>重要かどうか</p>
        <select name="imp" id="2">
          <option value="---">-------</option>
          <option value="重要">重要</option>
        </select>
        <Button>キャンセル</Button>
        <Button>保存</Button>
      </div>
    </ChakraProvider>
  );
};
export default Create;
