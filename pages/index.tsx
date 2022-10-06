import React, { useEffect } from "react";
import { useState } from "react";
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
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import theme from "./Theme";
import Header from "../components/Header";
import Link from "next/link";
import { RecoilRoot } from "recoil";
// 追加
import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { BasicUsage } from "../components/Modal";
// import { BasicUsage2 } from "../components/Modal2";

//Todo's type
type Todo = {
  value: string;
  readonly id?: number;
  checked: boolean;
  removed: boolean;
  important: boolean;
};
type Filter = "all" | "checked" | "unchecked" | "removed" | "important";

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [modalData, setModalData] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (todo) => {
    setModalData(todo);
    onOpen();
    return null;
  };

  //TODOを追加した時、新たにTODOリストを再生成
  const handleOnSubmit = async () => {
    if (!text) return;
    const newTodo: Todo = {
      value: text,
      checked: false,
      removed: false,
      important: false,
    };

    const ref = collection(db, "todos");

    const ref2 = await addDoc(ref, {});

    await setDoc(doc(db, "todos", ref2.id), {
      ...newTodo,
      id: ref2.id,
    });
  };

  const handleEditInModal = async (todo) => {
    await setDoc(doc(db, "todos", todo.id), {
      ...todo,
      value: todo.value,
    });
    onClose();
  };

  const ob = { text: "hoge", title: "huga" };
  const newOb = { ...ob, title: "value" };
  console.log(ob, newOb);

  const q = query(collection(db, "todos"));
  useEffect(() => {
    const unSub = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((todo) => {
          const { id, value, important, removed, checked } = todo.data();
          return {
            id,
            value,
            important,
            removed,
            checked,
          };
        })
      );
    });
    return () => unSub();
  }, []);

  //textが入力された時
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Header />
        <div className="main" style={{ margin: "10px" }}>
          <Grid
            h="300px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            style={{ margin: "40px" }}
            gap={4}
          >
            <GridItem
              colSpan={3}
              bg="white"
              shadow="md"
              rounded="md"
              padding={4}
            >
              <Stack>
                {/* filter */}
                {/* // e.target.value: string を Filter 型にキャストします */}
                {filter === "removed" ? (
                  <Button
                    onClick={handleOnEmpty}
                    disabled={todos.filter((todo) => todo.removed).length === 0}
                    colorScheme="red"
                  >
                    ごみ箱を空にする
                  </Button>
                ) : (
                  <>
                    <h2>新しいタスクを入力しよう</h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleOnSubmit();
                      }}
                    >
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
                    </form>
                  </>
                )}
              </Stack>
            </GridItem>
            <GridItem
              colSpan={2}
              bg="white"
              shadow="md"
              rounded="md"
              padding={4}
            >
              <Link href="/create">
                <Button>タスクを追加する</Button>
              </Link>
            </GridItem>
            <GridItem
              colSpan={1}
              bg="white"
              shadow="md"
              rounded="md"
              padding={4}
            >
              <h2 style={{ marginBottom: "0.5rem" }}>
                表示するタスクを絞り込む
              </h2>
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
            <GridItem
              colSpan={5}
              bg="white"
              shadow="md"
              rounded="md"
              padding={4}
            >
              <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
                Todo一覧
              </h2>
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
                          onChange={(e) =>
                            handleOnEdit(todo.id, e.target.value)
                          }
                        />
                        {/* <Link href="/edit"> */}
                        {console.log(todo)}
                        <Button onClick={() => openModal(todo)}>編集</Button>
                        {/* {isOpen && ( */}
                        <BasicUsage
                          isOpen={isOpen}
                          onClose={onClose}
                          setData={setModalData}
                          handleEdit={handleEditInModal}
                        >
                          {modalData}
                        </BasicUsage>
                        {/* <BasicUsage2>{todo}</BasicUsage2> */}
                        {/* )} */}
                        {/* </Link> */}
                        <Button
                          className="removeBtn"
                          colorScheme="red"
                          style={{ margin: "0 5px" }}
                          onClick={() => handleOnRemove(todo.id, todo.removed)}
                        >
                          {todo.removed ? "復元" : "削除"}
                        </Button>
                        <Button
                          className={
                            todo.important ? "importantBtn" : "inactive"
                          }
                          colorScheme={todo.important ? "yellow" : "gray"}
                          onClick={() =>
                            handleOnImportant(todo.id, todo.important)
                          }
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
        </div>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
