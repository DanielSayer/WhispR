import { Avatar, Tooltip, Typography } from "@mui/material"
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
      <Avatar {...stringAvatar(getAvatar())} />
      <Tooltip title={getTimeStamp()} arrow enterDelay={1000}>
        <Typography className="message-content" variant="body2">
          {info.message}
        </Typography>
      </Tooltip>
    </div>
  )
}
export default ChatMessage
