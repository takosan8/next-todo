import { Button, ChakraProvider, Text } from "@chakra-ui/react";
import Header from "../components/Header";

import theme from "./Theme";

export default function edit() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <div className="main" style={{ margin: "10px" }}>
        <Text fontSize="4xl">タスクを編集</Text>
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
        <Button>削除</Button>
        <Button>保存</Button>
      </div>
    </ChakraProvider>
  );
}
