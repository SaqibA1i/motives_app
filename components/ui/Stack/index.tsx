import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
  direction?: "row" | "column";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  gap?: number;
  width?: string;
  padding?: number;
  margin?: number;
  fullWidth?: boolean;
  onClick?: () => void;
  style?: any;
}

export const Stack = ({
  children,
  direction,
  justifyContent,
  alignItems,
  gap,
  width,
  padding,
  margin,
  fullWidth,
  style,
  onClick,
}: Props) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: direction ?? "row",
      justifyContent: justifyContent ?? "center",
      alignItems: alignItems ?? "center",
      gap: gap ?? 0,
      //@ts-ignore
      width: fullWidth ? "-webkit-fill-available" : width ?? "auto",
      padding,
      margin,
    },
    style,
  });
  return <View style={styles.container}>{children}</View>;
};
