import { Avatar, Typography } from "@mui/material"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"

interface INameBlockProps {
  name: string
  username: string
}

const NameBlock: React.FC<INameBlockProps> = ({
  name,
  username,
}): React.ReactElement => {
  return (
    <div className="name-block">
      <Avatar {...stringAvatar(name)} />
      <div className="user-info">
        <Typography component="div" variant="body1">
          {name}
        </Typography>
        <Typography
          component="div"
          fontSize={11}
          variant="caption"
          sx={{ opacity: 0.8 }}
        >
          @ {username}
        </Typography>
      </div>
    </div>
  )
}

export default NameBlock
