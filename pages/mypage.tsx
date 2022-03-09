import Header from "../components/Header";
import theme from "./Theme";
import {
  ChakraProvider,
  Stack,
  Center,
  Flex,
  Heading,
  Button,
  OrderedList,
  ListItem,
  Input,
  Checkbox,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

//日時
const today = new Date();

const myPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Grid
        h="300px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        style={{ margin: "40px" }}
        gap={1}
      >
        <GridItem colSpan={6} bg="white" shadow="md" rounded="md" padding={4}>
          <Stack>
            <Center>
              <Stack>
                <h1>マイページです</h1>
                <p
                  style={{
                    color: "#90CDF4",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  最終ログイン：
                  {today.getFullYear() +
                    "/" +
                    (today.getMonth() + 1) +
                    "/" +
                    today.getDate()}
                </p>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src="/azarashi.png"
                  alt="user01"
                />
              </Stack>
            </Center>
            <Center>
              <Stack>
                <p>マーケティング課</p>
                <p>あざらし さん</p>
              </Stack>
            </Center>
            <Center>
              <Link href="edit">Edit Profile</Link>
            </Center>
          </Stack>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};
export default myPage;
