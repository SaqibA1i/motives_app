import { useEffect, useState } from "react";
import AuthWrapper from "./Authentication";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import { ModalsProvider } from "./Modal";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export const Wrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>{children}</AuthWrapper>
    </QueryClientProvider>
  );
};
