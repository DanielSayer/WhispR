import {
  AttachFile,
  Call,
  MoreHoriz,
  Search,
  Send,
  ThumbUp,
  Videocam,
} from "@mui/icons-material"
import { IconButton, OutlinedInput } from "@mui/material"
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import ChatMessage from "../../../components/ChatMessages"
import NameBlock from "../../../components/NameBlock"
import { IChatHistory } from "../../../components/SideMenu"
import { AuthenticationContext } from "../../../context/authenticationContext"
import { ChatContext } from "../../../context/chatContext/chatContext"
import { db } from "../../../firebase"
import "./styles.scss"

interface IConversationData {
  messages: IChatMessage[]
}

export interface IChatMessage {
  id: string
  message: string
  senderId: string
  date: any
}

const UserChat: React.FC = (): React.ReactElement => {
  const { user } = useContext(AuthenticationContext)
  const { currentChat } = useContext(ChatContext)
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<IChatMessage[]>([])

  useEffect(() => {
    if (!currentChat.chatId) return
    const conversationRef = doc(db, "conversations", currentChat.chatId)
    const unSub = onSnapshot(conversationRef, (messages) => {
      if (!messages.exists()) return
      const data = messages.data() as IConversationData
      setMessages(data.messages.reverse())
    })
    return () => {
      unSub()
    }
  }, [currentChat.chatId])

  const handleSend = async () => {
    if (!currentChat.selectedUser?.id || !user?.uid) return
    const conversationRef = doc(db, "conversations", currentChat.chatId)
    await updateDoc(conversationRef, {
      messages: arrayUnion({
        id: uuid(),
        message: message,
        senderId: user.uid,
        date: Date.now(),
      }),
    })

    setMessage("")

    const chatHistoryRef = doc(db, "chatHistory", user.uid)
    await updateDoc(chatHistoryRef, {
      [`${currentChat.chatId}.lastMessage`]: message,
      [`${currentChat.chatId}.timestamp`]: Date.now(),
    })
    const receiverHistoryRef = doc(
      db,
      "chatHistory",
      currentChat.selectedUser.id
    )
    await updateDoc(receiverHistoryRef, {
      [`${currentChat.chatId}`]: {
        id: user.uid,
        username: user.displayName,
        lastMessage: message,
        hasSeen: false,
        timestamp: Date.now(),
      } as IChatHistory,
    })
  }

  return (
    <div className="chat-panel">
      {currentChat.selectedUser && (
        <>
          <div className="chat-header">
            <NameBlock
              name={currentChat.selectedUser.username}
              username="JJSEXY"
            />
            <div className="icons">
              <Call />
              <Videocam />
              <Search />
              <MoreHoriz />
            </div>
          </div>
          <div className="chat-area">
            {messages.map((m) => (
              <ChatMessage info={m} />
            ))}
          </div>

          <div className="send-bar">
            <AttachFile />
            <OutlinedInput
              className="w-85 pill"
              placeholder="Type a message..."
              size="small"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
            />
            {message === "" ? (
              <IconButton>
                <ThumbUp />
              </IconButton>
            ) : (
              <IconButton aria-label="send" onClick={handleSend}>
                <Send />
              </IconButton>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UserChat
