import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ConfirmContextProvider } from "chakra-confirm";
import { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <ConfirmContextProvider>
        <Box m="2">
          <Component {...pageProps} />
        </Box>
      </ConfirmContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
