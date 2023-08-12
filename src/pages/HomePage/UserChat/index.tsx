import {
  AttachFile,
  Call,
  MoreHoriz,
  Search,
  Send,
  ThumbUp,
  Videocam,
} from "@mui/icons-material"
import { OutlinedInput } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ChatMessage from "../../../components/ChatMessages"
import NameBlock from "../../../components/NameBlock"
import { ChatContext } from "../../../context/chatContext/chatContext"
import "./styles.scss"

const UserChat: React.FC = (): React.ReactElement => {
  const { currentChat } = useContext(ChatContext)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {}, [])

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
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
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
            {message === "" ? <ThumbUp /> : <Send />}
          </div>
        </>
      )}
    </div>
  )
}

export default UserChat
