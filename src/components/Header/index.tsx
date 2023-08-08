import { Avatar } from "@mui/material"
import { default as Logo } from "../../assets/images/whisprLogo.png"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"
import { Logout } from "@mui/icons-material"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

const Header: React.FC = (): React.ReactElement => {
  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <div className="header">
      <img draggable={false} className="logo" src={Logo} />
      <div className="menu">
        <div onClick={handleSignOut}>
          <Logout className="icon" />
        </div>
        <Avatar {...stringAvatar("Daniel Sayer")} />
      </div>
    </div>
  )
}
export default Header
