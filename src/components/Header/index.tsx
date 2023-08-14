import { Avatar } from "@mui/material"
import { default as Logo } from "../../assets/images/whisprLogo.png"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import "./styles.scss"
import { Logout } from "@mui/icons-material"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../appRoutes"

interface IHeaderProps {
  name: string
}

const Header: React.FC<IHeaderProps> = ({ name }): React.ReactElement => {
  const navigate = useNavigate()
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
        <div
          className="cursor-pointer"
          onClick={() => navigate(AppRoutes.getEditProfilePage())}
        >
          <Avatar {...stringAvatar(name)} />
        </div>
      </div>
    </div>
  )
}
export default Header
