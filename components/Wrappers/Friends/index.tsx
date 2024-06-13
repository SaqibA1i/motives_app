import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Friend } from "../../types";

interface FriendContextType {
  friends: Friend[] | null;
  setFriends: Dispatch<SetStateAction<Friend[] | null>>;
}

const FriendContext = createContext<FriendContextType | undefined>(undefined);

const useFriend = () => {
  const context = useContext(FriendContext);
  if (!context) {
    throw new Error("useFriend must be used within a FriendProvider");
  }
  return context;
};

const FriendProvider: React.FC<{
  children: ReactNode;
  value?: FriendContextType;
}> = ({ children, value: defaultValue }) => {
  const [friends, setFriends] = React.useState<Friend[] | null>(null);

  const value: FriendContextType = {
    friends,
    setFriends,
  };

  return (
    <FriendContext.Provider value={defaultValue ?? value}>
      {children}
    </FriendContext.Provider>
  );
};

export { useFriend, FriendProvider };
