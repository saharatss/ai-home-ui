import "./globals.css";

import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import { Kanit } from 'next/font/google'
const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
})

export type NextPageWithLayout<P = object, IP = object> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

import { UserProvider } from "../context/user";
import Head from "next/head";
import { ToastProvider } from "@heroui/react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserProvider>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
        <title>Smart AI Home</title>
        <meta name="description" content="Smart AI Home" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#FAFAFA"/>
        <meta name="description" content="Smart AI Home"/>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black"/>
        <meta name="mobile-web-app-title" content="Smart AI Home"/>
      </Head>
      <div className={kanit.className + " font-light"}>
        {getLayout(<Component {...pageProps} />)}
      </div>
      <ToastProvider placement='top-center' toastOffset={10} />
    </UserProvider>
  );
}