import { useContext } from "react"
import Header from "../../components/Header"
import { AuthenticationContext } from "../../context/authenticationContext"
import SideMenu from "./SideMenu"
import UserChat from "./UserChat"
import "./styles.scss"

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
