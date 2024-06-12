import { useEffect, useState } from "react";
import AuthWrapper from "./Authentication";
import { Builder } from "./Builders/type";

import { ModalsProvider } from "./Modal";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export const Wrapper = ({ children }: Props) => {
  return (
    <AuthWrapper>
      <ModalsProvider>{children}</ModalsProvider>
    </AuthWrapper>
  );
};
