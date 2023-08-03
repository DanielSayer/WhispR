import { Apps } from "@mui/icons-material"
import { Avatar } from "@mui/material"
import { default as Logo } from "../../assets/images/whisprLogo.png"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"

const Header: React.FC = (): React.ReactElement => {
  return (
    <div className="header">
      <img draggable={false} className="logo" src={Logo} />
      <div className="menu">
        <Apps />
        <Avatar {...stringAvatar("Daniel Sayer")} />
      </div>
    </div>
  )
}
export default Header
