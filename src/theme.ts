import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
colors: {
primary: "#3182CE",
secondary: "#2D3748",
},
styles: {
global: {
body: {
bg: "#F7FAFC",
color: "#2D3748",
},
},
},
});

export default theme;
