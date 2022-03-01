import { extendTheme, GridItem } from "@chakra-ui/react";

const theme = extendTheme({
    styles:{
        global: {
            body: {
                backgroundColor:"blue.50",
                color: "gray.800",
            },
            gridItem: {
                padding:"20px",
            }
        }
    }
})

export default theme;