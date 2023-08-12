import { createContext, useContext, useReducer } from "react"
import { AuthenticationContext } from "../authenticationContext"
import chatReducer, { IChatActions, IChatState } from "./chatContextReducer"

export interface IChatContextType {
  currentChat: IChatState
  dispatch: React.Dispatch<IChatActions>
}

export const ChatContext = createContext<IChatContextType>({
  currentChat: { selectedUser: null, chatId: "" },
  dispatch: () => {},
})

interface IChatContextProviderProps {
  children: React.ReactNode
}

export const ChatContextProvider: React.FC<IChatContextProviderProps> = ({
  children,
}) => {
  const { user } = useContext(AuthenticationContext)
  const [state, dispatch] = useReducer(
    (prevState: IChatState, action: IChatActions) =>
      chatReducer(prevState, action, user),
    {
      selectedUser: null,
      chatId: "",
    }
  )

  return (
    <ChatContext.Provider value={{ currentChat: state, dispatch: dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
