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
  Divider,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useState } from "react";
import theme from "./theme";
import NextLink from "next/link";
import Link from "next/link";

export const Login = memo(() => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onClickLogin = () => {
    if (userId === "123" && password === "123") {
    } else {
      return;
    }
  };
  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Stack bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" textAlign="center">
            ログイン画面
          </Heading>
          <Divider />
          <Input placeholder="ID" value={userId} onChange={onChangeUserId} />
          <Input
            placeholder="PASSWORD"
            value={password}
            onChange={onChangePassword}
          />
          <Button
            bg="blue.200"
            color="white"
            disabled={userId === "" || password === ""}
          >
            <a>ログイン</a>
          </Button>
        </Stack>
      </Flex>
    </>
  );
});

export default Login;
