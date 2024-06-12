import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Modal } from "./type";

interface ModalContextType {
  toggle: boolean;
  title: string;
  body: JSX.Element;
  onConfirm: VoidFunction;
  open: (title: string, body: JSX.Element, onConfirm: Function) => void;
  hide: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const ModalsProvider: React.FC<{
  children: ReactNode;
  value?: ModalContextType;
}> = ({ children, value: defaultValue }) => {
  const [toggle, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(<></>);
  const [onConfirm, setOnConfirm] = useState<VoidFunction | null>(null);
  const hide = () => setOpen(false);

  const open = (str: string, body, fn) => {
    setTitle(str);
    setOnConfirm(() => fn);
    setOpen(true);
    setBody(body);
  };
  const value: ModalContextType = {
    toggle,
    title,
    body,
    onConfirm,
    open,
    hide,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export { useModal, ModalsProvider };
