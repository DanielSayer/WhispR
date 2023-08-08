import { Avatar } from "@mui/material"
import { default as Logo } from "../../assets/images/whisprLogo.png"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"
import { Logout } from "@mui/icons-material"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

interface IHeaderProps {
  name: string
}

const Header: React.FC<IHeaderProps> = ({ name }): React.ReactElement => {
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
        <Avatar {...stringAvatar(name)} />
      </div>
    </div>
  )
}
export default Header
