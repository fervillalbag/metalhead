import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import client from "@/config/apollo";
import { CartContextProvider } from "@/context/CartContext";
import { CartContextModalProvider } from "@/context/CartContextModal";

import "@/styles/index.css";
import "@/styles/globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import { MenuContextProvider } from "@/context/MenuContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <MenuContextProvider>
        <CartContextProvider>
          <CartContextModalProvider>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
              <Toaster position="top-center" reverseOrder={false} />
            </ApolloProvider>
          </CartContextModalProvider>
        </CartContextProvider>
      </MenuContextProvider>
    </AnimatePresence>
  );
};

export default MyApp;
