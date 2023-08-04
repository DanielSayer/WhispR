import { Avatar, Typography } from "@mui/material"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"

interface IRecentChatProps {
  name: string
  mostRecentMessage: string
}

const RecentChat: React.FC<IRecentChatProps> = ({
  name,
  mostRecentMessage,
}): React.ReactElement => {
  return (
    <div className="chat-container">
      <Avatar {...stringAvatar(name)} />
      <div className="content">
        <Typography variant="subtitle2" color="primary">
          {name}
        </Typography>
        <Typography variant="caption" color="primary" sx={{ opacity: 0.8 }}>
          {mostRecentMessage}
        </Typography>
      </div>
    </div>
  )
}

export default RecentChat
