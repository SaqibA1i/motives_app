import React, { useRef } from "react";
import style from "./Page.module.css";
import classNames from "classnames";

export const Page = ({
  children,
  className,
  onScroll,
}: {
  onScroll?: any;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef();
  return (
    <div
      ref={ref}
      className={classNames(style.Page, className)}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
};
