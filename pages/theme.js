import { extendTheme, GridItem } from "@chakra-ui/react";

const Theme = extendTheme({
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

export default Theme;