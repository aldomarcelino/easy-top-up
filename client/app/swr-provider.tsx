"use client";

import axios from "axios";
import { SWRConfig } from "swr";

const cacheProvider = () => new Map();

export const SWRProvider = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        provider: cacheProvider,
        fetcher: (url) => axios(url).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};
