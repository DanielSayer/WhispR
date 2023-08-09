import { Avatar, Typography } from "@mui/material"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"

interface IRecentChatProps {
  id: string
  name: string
  mostRecentMessage: string
  onClick: (id: string, username: string) => void
}

const RecentChat: React.FC<IRecentChatProps> = ({
  id,
  name,
  mostRecentMessage,
  onClick,
}): React.ReactElement => {
  return (
    <div key={id} className="chat-container" onClick={() => onClick(id, name)}>
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
