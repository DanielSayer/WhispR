import {
  Chat,
  ChevronLeft,
  Edit,
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
import { ChangeEvent, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../appRoutes"
import Header from "../../components/Header"
import { AuthenticationContext } from "../../context/authenticationContext"
import "./styles.scss"
import { stringAvatar } from "../../utils/helperMethods/generateAvatar"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../firebase"
import { updateProfile } from "firebase/auth"

const EditProfilePage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate()
  const { user } = useContext(AuthenticationContext)
  const name = user?.displayName ?? ""

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !user) return
    const file = e.target.files[0]
    const storageRef = ref(storage, name)

    try {
      const uploadTask = uploadBytesResumable(storageRef, file)
      await uploadTask
      const downloadUrl = await getDownloadURL(storageRef)

      await updateProfile(user, {
        displayName: name,
        photoURL: downloadUrl,
      })
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

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
              <div style={{ position: "relative" }}>
                <Avatar className="avatar" {...stringAvatar(name)} />
                <label htmlFor="file-select">
                  <Edit className="cursor-pointer" />
                </label>
                <input
                  id="file-select"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleAddImage}
                />
              </div>
              <Typography variant="h5">Welcome, {name}</Typography>

              <img src={user?.photoURL ?? ""} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EditProfilePage
