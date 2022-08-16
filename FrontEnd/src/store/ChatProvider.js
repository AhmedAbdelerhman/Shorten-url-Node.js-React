import { createContext, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [statusCode, setStatusCode] = useState();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [allUsers, setAllUsers] = useState();
  const [myChats, setMyChats] = useState([]);

  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) history.push("/");
  return (
    <ChatContext.Provider
      value={{
        allUsers,
        setAllUsers,
        statusCode,
        setStatusCode,
        snackBar,
        setSnackBar,
        myChats,
         setMyChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
