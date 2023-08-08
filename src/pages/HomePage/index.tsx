import UserChat from "./UserChat"
import Header from "../../components/Header"
import SideMenu from "../../components/SideMenu"
import "./styles.scss"
import { useContext } from "react"
import { AuthenticationContext } from "../../context/authenticationContext"

const HomePage: React.FC = (): React.ReactElement => {
  const { user } = useContext(AuthenticationContext)
  const name = user?.displayName ?? ""
  return (
    <div className="app">
      <Header name={name} />
      <div className="content">
        <SideMenu />
        <UserChat />
      </div>
    </div>
  )
}
export default HomePage
