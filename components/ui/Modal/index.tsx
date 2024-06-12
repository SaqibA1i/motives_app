import { Stack } from "../Stack";
import style from "./Modal.module.css";
import { Button } from "../Button";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  children: React.ReactNode;
  toggle: boolean;
  hide: VoidFunction;
}
export const Modal = ({ toggle, hide, title, children }: Props) => {
  if (!toggle) {
    return null;
  }
  return (
    <div className={style.Container}>
      <Stack direction="column" className={style.Modal}>
        <Stack fullWidth justifyContent="space-between">
          <h2 className={style.ModalTitle}>{title}</h2>
          <FontAwesomeIcon
            icon={faX}
            onClick={hide}
            className={style.ModalClose}
          />
        </Stack>
        {children}
      </Stack>
    </div>
  );
};
