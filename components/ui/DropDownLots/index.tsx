import { useEffect, useState } from "react";
import style from "./DropDown.module.css";
import style2 from "@app/foundation/LotSelection/LotSelection.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Stack } from "../Stack";
import classNames from "classnames";
import { convertPriceToString } from "@app/foundation/helpers/convertPricetoString";
import { Lot } from "@app/foundation/constants/builders";
import { useRouter } from "next/router";

interface Props {
  options: Lot[];
  label: string;
  price: string;
}
const DropDownLots = ({ options, label, price }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuClass = open ? style.DropDownMenuShow : style.DropDownMenuHide;

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{ textAlign: "center", width: "100%" }}
    >
      <button
        className={classNames(style.Dropdown, open && style.DropDownOpen)}
        type="button"
      >
        <Stack justifyContent="space-between">
          <Stack direction="column" alignItems="baseline" gap="0.3rem">
            <p style={{ margin: "0", fontWeight: "500" }}>
              <span>{options.length} * </span>
              {label}
            </p>
            <p
              style={{
                margin: "0",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              {price}
            </p>
          </Stack>
          <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
        </Stack>
      </button>
      <div className={menuClass + " " + style.DropDownMenu}>
        {options.map((lot) => (
          <Stack
            className={lot.available ? style.LotRow : style.disabled}
            key={lot.id}
            direction="row"
            gap="1rem"
            onClick={() => {
              if (lot.available) {
                router.push(`/lot?${lot.id}`);
              }
            }}
            justifyContent="space-between"
            fullWidth
          >
            <Stack direction="row" alignItems="baseline" gap="2rem">
              <h3 style={{ margin: "0", fontWeight: "600" }}>{lot.label}</h3>
              <p
                style={{
                  margin: "0",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                {/* {`$${convertPriceToString(lot.priceRange.min)}+`} */}
                {!lot.available && " (Sold)"}
              </p>
            </Stack>
            <FontAwesomeIcon icon={faChevronRight} color="grey" />
          </Stack>
        ))}
      </div>
    </div>
  );
};

export default DropDownLots;
