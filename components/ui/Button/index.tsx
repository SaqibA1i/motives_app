import classNames from "classnames";
import style from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  state?: "pending" | "resolved" | "disabled";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconAtEnd?: boolean;
}
export function Button({
  children,
  onClick,
  className,
  disabled,
  type,
  fullWidth,
  state,
  icon,
  iconAtEnd = false,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        style.Button,
        state === "pending" && style.ButtonPending,
        state === "disabled" && style.ButtonDisabled,
        className
      )}
      style={{ width: fullWidth ? "100%" : "auto" }}
    >
      {children}
    </div>
  );
}
