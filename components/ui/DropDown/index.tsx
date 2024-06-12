import { useEffect, useState } from "react";
import style from "./DropDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "../Stack";
import classNames from "classnames";

interface Props {
  options: string[];
  defaultValue?: string;
  onChange: (option: string) => void;
}
const DropDown = ({ options, onChange, defaultValue }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSel] = useState(defaultValue ?? "No available projects");

  const menuClass = open ? style.DropDownMenuShow : style.DropDownMenuHide;
  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <div onClick={() => setOpen(!open)} style={{ textAlign: "center" }}>
      <button
        className={classNames(style.Dropdown, open && style.DropDownOpen)}
        type="button"
      >
        <Stack justifyContent="space-between">
          <p>{selected}</p>
          <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
        </Stack>
      </button>
      <div
        className={menuClass + " " + style.DropDownMenu}
        aria-labelledby="dropdownMenuButton"
      >
        {options.map((opt) => (
          <span
            key={opt}
            className={style.DropDownItem}
            onClick={() => setSel(opt)}
          >
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
