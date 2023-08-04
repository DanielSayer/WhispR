import UserChat from "./UserChat"
import Header from "../../components/Header"
import SideMenu from "../../components/SideMenu"
import "./styles.scss"

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <SideMenu />
        <UserChat />
      </div>
    </div>
  )
}
export default HomePage
