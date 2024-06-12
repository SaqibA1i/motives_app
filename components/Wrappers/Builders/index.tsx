import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Builder } from "./type";

interface BuilderContextType {
  builders: Builder[];
  setBuilder: Dispatch<SetStateAction<Builder[]>>;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};

const BuildersProvider: React.FC<{
  children: ReactNode;
  value?: BuilderContextType;
}> = ({ children, value: defaultValue }) => {
  const [builders, setBuilder] = React.useState<Builder[]>([]);
  const value: BuilderContextType = {
    builders,
    setBuilder,
  };

  return (
    <BuilderContext.Provider value={defaultValue ?? value}>
      {children}
    </BuilderContext.Provider>
  );
};

export { useBuilder, BuildersProvider };
