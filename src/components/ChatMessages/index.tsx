import { Avatar, Typography } from "@mui/material"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"

interface IMessageProps {
  message: string
}

const ChatMessage: React.FC<IMessageProps> = ({
  message,
}): React.ReactElement => {
  return (
    <div className="message">
      <div className="message-info">
        <Avatar {...stringAvatar("Daniel Sayer")} />
        <Typography component="p">just now</Typography>
      </div>
      <Typography className="message-content" variant="body2">
        {message}
      </Typography>
    </div>
  )
}
export default ChatMessage
