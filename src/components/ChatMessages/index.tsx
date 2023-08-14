import { Avatar, Typography } from "@mui/material"
import { useContext } from "react"
import { AuthenticationContext } from "../../context/authenticationContext"
import { ChatContext } from "../../context/chatContext/chatContext"
import { IChatMessage } from "../../pages/HomePage/UserChat"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import {
  generateTimeElapsed,
  timeToMessage,
} from "../../utils/helperMethods/timeUtils"
import "./styles.scss"

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

  const getTimeStamp = (): string => {
    const time = generateTimeElapsed(info.date)
    return timeToMessage(time)
  }

  return (
    <div
      key={info.id}
      className={`message ${info.senderId === user?.uid ? "self" : ""}`}
    >
      <div className="avatar-content">
        <Avatar {...stringAvatar(getAvatar())} />
        <Typography className="message-content" variant="body2">
          {info.message}
        </Typography>
      </div>
      <Typography component="p" className="timestamp">
        {getTimeStamp()}
      </Typography>
    </div>
  )
}
export default ChatMessage
