import "./styles.scss"
import NameBlock from "../../../components/NameBlock"
import {
  Call,
  Videocam,
  MoreHoriz,
  Search,
  Send,
  ThumbUp,
  AttachFile,
} from "@mui/icons-material"
import { OutlinedInput } from "@mui/material"
import { useState } from "react"

const UserChat: React.FC = (): React.ReactElement => {
  const [message, setMessage] = useState<string>("")
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
    </div>
  )
}

export default UserChat
