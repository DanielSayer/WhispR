import { Search } from "@mui/icons-material"
import {
  Button,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material"
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from "../../context/authenticationContext"
import { db } from "../../firebase"
import RecentChat from "../RecentChat"
import "./styles.scss"

interface IChatHistory {
  id: string
  username: string
  lastMessage: string
  hasSeen: boolean
  timestamp: number
}

const SideMenu: React.FC = (): React.ReactElement => {
  const { user } = useContext(AuthenticationContext)
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadUserChatHistory = async () => {
      let previousUserHistory: IChatHistory[] = []
      const userDocRef = doc(db, "chatHistory", user!.uid)
      const converstationCollectionRef = collection(
        userDocRef,
        "recentConversations"
      )
      const response = await getDocs(converstationCollectionRef)
      response.forEach((u) =>
        previousUserHistory.push({
          id: u.get("id"),
          lastMessage: u.get("lastMessage"),
          hasSeen: u.get("hasSeen"),
          username: u.get("username"),
          timestamp: u.get("timestamp"),
        })
      )
      previousUserHistory.sort((a, b) => b.timestamp - a.timestamp)
      setChatHistory(previousUserHistory)
    }
    if (!user) return
    loadUserChatHistory()
  }, [])

  const [search, setSearch] = useState<string>("")
  const filteredData = chatHistory.filter((x) =>
    x.username.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearchForUsers = async () => {
    const q = query(collection(db, "users"), where("userName", "==", search))
    setIsLoading(true)
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((p) =>
      setChatHistory((curr) => [
        ...curr,
        {
          id: p.get("userId"),
          lastMessage: "",
          hasSeen: false,
          username: p.get("userName"),
          timestamp: Date.now(),
        },
      ])
    )
    setIsLoading(false)
  }

  const handleSelectUser = async (id: string, username: string) => {
    const userDocRef = doc(db, "chatHistory", user!.uid)
    const conversationDocRef = doc(userDocRef, "recentConversations", id)
    await setDoc(conversationDocRef, {
      id: id,
      username: username,
      lastMessage: "",
      hasSeen: true,
      timestamp: Date.now(),
    } as IChatHistory)

    //find in array push to front
  }

  return (
    <div className="side-menu">
      <OutlinedInput
        id="Search"
        placeholder="Search"
        size="small"
        className="mb-2 w-100"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
      <div className="friends">
        <div style={{ display: "grid", gap: "0.25rem" }}>
          {filteredData.length > 0 ? (
            filteredData.map((a) => (
              <RecentChat
                id={a.id}
                name={a.username}
                mostRecentMessage={a.lastMessage}
                onClick={handleSelectUser}
              />
            ))
          ) : (
            <div
              style={{
                opacity: 0.5,
                display: "flex",
                marginTop: "1rem",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "0.5rem",
              }}
            >
              <Typography variant="subtitle1" color="primary">
                You have no recent chats with a user matching that name.
              </Typography>
              <hr className="w-75" />
              <Button
                variant="text"
                onClick={handleSearchForUsers}
                style={{ alignItems: "center", display: "flex" }}
              >
                Search For Users
                <div className="ms-3" style={{ lineHeight: 1 }}>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={15} />
                  ) : (
                    <Search />
                  )}
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideMenu
