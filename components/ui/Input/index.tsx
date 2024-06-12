import React from "react";
import style from "./Input.module.css";
import { Stack } from "../Stack";

interface Props {
  type: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  required?: boolean;
  name: string;
}
export function Input({
  type,
  label,
  placeholder,
  onChange,
  value,
  className,
  required,
  name,
}: Props) {
  return (
    <Stack
      className="InputWrapper"
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      gap="0.3rem"
      fullWidth
    >
      {label && <label className={style.Label}>{label}</label>}
      {React.createElement("input", {
        name: name,
        type: type,
        placeholder: placeholder,
        onChange: onChange,
        value: value,
        required: required,
        className: `${style.Input} ${className}`,
      })}
    </Stack>
  );
}
