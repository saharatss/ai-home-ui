'use client'
import React, { ReactElement } from "react";

import { PageMetadata } from "@/context/page-metadata";

const Page = () => {
  return (<></>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<PageMetadata.Provider><PageMetadata.AppMainLayout>{page}</PageMetadata.AppMainLayout></PageMetadata.Provider>);
};

export default Page;