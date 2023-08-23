import {
  Chat,
  ChevronLeft,
  Info,
  Person,
  Settings,
  Shield,
} from "@mui/icons-material"
import {
  Avatar,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../appRoutes"
import Header from "../../components/Header"
import { AuthenticationContext } from "../../context/authenticationContext"
import "./styles.scss"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"

const EditProfilePage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()
  const { user } = useContext(AuthenticationContext)
  const name = user?.displayName ?? ""
  return (
    <div className="app">
      <Header name={name} />
      <div className="content p-3">
        <Card className="settings">
          <div>
            <Typography
              variant="h5"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                className="p-0 pe-2"
                onClick={() => navigate(AppRoutes.getHomePage())}
              >
                <ChevronLeft />
              </IconButton>
              Settings
            </Typography>
          </div>
          <div className="page-content">
            <div className="side-menu">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Shield />
                    </ListItemIcon>
                    <ListItemText primary="Privacy and Security" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Chat Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Chat />
                    </ListItemIcon>
                    <ListItemText primary="Help and Support" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Info />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
            <div className="menu-option">
              <Avatar {...stringAvatar(name)} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EditProfilePage
