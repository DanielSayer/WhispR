import { generateCombinedId } from "../../utils/helperMethods/generateId"
import { User } from "firebase/auth"

const CHAT_ACTIONS = {
  CHANGE_USER: "CHANGE_USER",
} as const
type ChatActions = keyof typeof CHAT_ACTIONS

export interface IChatActions {
  type: ChatActions
  payload: IPerson
}

export interface IChatState {
  chatId: string
  selectedUser: IPerson | null
}

interface IPerson {
  id: string
  username: string
}

const chatReducer = (
  state: IChatState,
  action: IChatActions,
  user: User | null
): IChatState => {
  const { type, payload } = action

  if (!user) return state

  switch (type) {
    case "CHANGE_USER":
      return {
        selectedUser: payload,
        chatId: generateCombinedId(user.uid, payload.id),
      }
    default:
      return state
  }
}

export default chatReducer
