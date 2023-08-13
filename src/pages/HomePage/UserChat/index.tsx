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
import { useContext, useEffect, useState } from "react"
import ChatMessage from "../../../components/ChatMessages"
import NameBlock from "../../../components/NameBlock"
import { ChatContext } from "../../../context/chatContext/chatContext"
import "./styles.scss"
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase"
import { v4 as uuid } from "uuid"
import { AuthenticationContext } from "../../../context/authenticationContext"
import { IChatHistory } from "../../../components/SideMenu"

const UserChat: React.FC = (): React.ReactElement => {
  const { user } = useContext(AuthenticationContext)
  const { currentChat } = useContext(ChatContext)
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {}, [])

  const handleSend = async () => {
    if (!currentChat.selectedUser?.id || !user?.uid) return
    const conversionRef = doc(db, "conversations", currentChat.chatId)
    await updateDoc(conversionRef, {
      messages: arrayUnion({
        id: uuid(),
        message: message,
        senderId: user.uid,
        date: Timestamp.now(),
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
              <ChatMessage message={m} />
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
