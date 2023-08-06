import { Avatar, Typography } from "@mui/material"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"

const ChatMessage: React.FC = ({}): React.ReactElement => {
  return (
    <div className="message">
      <div className="message-info">
        <Avatar {...stringAvatar("Daniel Sayer")} />
        <Typography component="p">just now</Typography>
      </div>
      <Typography className="message-content" variant="body2">
        Hello, how are you today this is intentionally a longer message so I can
        experiment with wrapping etc
      </Typography>
    </div>
  )
}
export default ChatMessage
