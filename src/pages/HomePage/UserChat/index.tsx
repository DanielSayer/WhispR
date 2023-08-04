import "./styles.scss"
import NameBlock from "../../../components/NameBlock"
import { Call, Videocam, MoreHoriz, Search } from "@mui/icons-material"

const UserChat: React.FC = (): React.ReactElement => {
  const name = "Jared Sexy"

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <NameBlock name={name} username="JJSEXY" />
        <div className="icons">
          <Call />
          <Videocam />
          <Search />
          <MoreHoriz />
        </div>
      </div>
    </div>
  )
}

export default UserChat
