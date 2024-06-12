import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "./type";

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider: React.FC<{
  children: ReactNode;
  value?: UserContextType;
}> = ({ children, value: defaultValue }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const value: UserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={defaultValue ?? value}>
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
