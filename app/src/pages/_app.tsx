import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion";

import client from "@/config/apollo";
import "@/styles/index.css";
import "@/styles/globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AnimatePresence>
  );
};

export default MyApp;
