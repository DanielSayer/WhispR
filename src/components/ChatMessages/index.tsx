import { Avatar, Typography } from "@mui/material"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"
import { IChatMessage } from "../../pages/HomePage/UserChat"
import { useContext } from "react"
import { AuthenticationContext } from "../../context/authenticationContext"
import { ChatContext } from "../../context/chatContext/chatContext"

interface IMessageProps {
  info: IChatMessage
}

const ChatMessage: React.FC<IMessageProps> = ({ info }): React.ReactElement => {
  const { user } = useContext(AuthenticationContext)
  const { currentChat } = useContext(ChatContext)

  const getAvatar = (): string => {
    if (!user || !currentChat.selectedUser) return ""
    if (info.senderId === user?.uid) {
      return user.displayName!
    }
    return currentChat.selectedUser.username
  }

  return (
    <div
      key={info.id}
      className={`message ${info.senderId === user?.uid ? "self" : ""}`}
    >
      <div className="message-info">
        <Avatar {...stringAvatar(getAvatar())} />
        <Typography component="p">just now</Typography>
      </div>
      <Typography className="message-content" variant="body2">
        {info.message}
      </Typography>
    </div>
  )
}
export default ChatMessage
