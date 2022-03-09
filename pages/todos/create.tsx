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
  theme,
} from "@chakra-ui/react";
import { useState } from "react";
import Header from "../../components/Header";

const Create = () => {
  const [text, setText] = useState("");
  //Todo's type
  type Todo = {
    value: string;
    readonly id: number;
    checked: boolean;
    removed: boolean;
    important: boolean;
  };
  type Filter = "all" | "checked" | "unchecked" | "removed" | "important";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  //textが入力された時
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //TODOを追加した時、新たにTODOリストを再生成
  const handleOnSubmit = () => {
    if (!text) return;
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
      important: false,
    };
    setTodos([newTodo, ...todos]);
    setText("");
  };
  //todoの内容が変更される時
  const handleOnEdit = (id: number, value: string) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };
  // checkboxが押された時
  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  // 削除ボタンが押された時
  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  // filterにかけられたtodo
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "important":
        return todo.important && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });
  // 重要ボタンが押された時
  const handleOnImportant = (id: number, important: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.important = !important;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <h1>Create something.</h1>
      <input
        type="text"
        className="input-area"
        value={text}
        disabled={filter === "checked"}
        style={{
          width: "80%",
          marginRight: "20px",
          lineHeight: "36px",
          padding: "0 5px",
          border: "1px solid #A0AEC0",
          borderRadius: "0.375rem",
        }}
        onChange={(e) => handleOnChange(e)}
      />
      <Button
        type="submit"
        value="追加"
        colorScheme="teal"
        disabled={filter === "checked"}
        onSubmit={handleOnSubmit}
      >
        追加
      </Button>
      <Grid>
        <GridItem colSpan={5} bg="white" shadow="md" rounded="md" padding={4}>
          <h2 style={{ marginBottom: "0.5rem" }}>表示するタスクを絞り込む</h2>
          <select
            defaultValue="all"
            onChange={(e) => setFilter(e.target.value as Filter)}
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #A0AEC0",
              borderRadius: "0.375rem",
            }}
          >
            <option value="all">すべて</option>
            <option value="checked">完了</option>
            <option value="unchecked">未完了</option>
            <option value="important">重要</option>
            <option value="removed">ごみ箱</option>
          </select>
        </GridItem>
        <GridItem colSpan={5} bg="white" shadow="md" rounded="md" padding={4}>
          <OrderedList>
            {filteredTodos.map((todo) => {
              return (
                <ListItem key={todo.id} style={{ marginBottom: "10px" }}>
                  <Flex>
                    <style jsx>
                      {`
                        .chakra-checkbox__input span {
                          background: #fff;
                        }
                        li::marker {
                          color: "";
                        }
                      `}
                    </style>
                    <Checkbox
                      // type="checkbox"
                      defaultBgColor="white"
                      disabled={todo.removed}
                      checked={todo.checked}
                      style={{ margin: "5px" }}
                      onChange={(e) => handleOnCheck(todo.id, todo.checked)}
                    />
                    <Input
                      type="text"
                      disabled={todo.checked || todo.removed}
                      value={todo.value}
                      style={{
                        background: "#fff",
                        borderColor: "#A0AEC0",
                      }}
                      onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                    />
                    <Button
                      className="removeBtn"
                      colorScheme="red"
                      style={{ margin: "0 5px" }}
                      onClick={() => handleOnRemove(todo.id, todo.removed)}
                    >
                      {todo.removed ? "復元" : "削除"}
                    </Button>
                    <Button
                      className={todo.important ? "importantBtn" : "inactive"}
                      colorScheme={todo.important ? "yellow" : "gray"}
                      onClick={() => handleOnImportant(todo.id, todo.important)}
                    >
                      重要
                    </Button>
                  </Flex>
                </ListItem>
              );
            })}
          </OrderedList>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};
export default Create;
