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
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from "../../context/authenticationContext"
import { db } from "../../firebase"
import RecentChat from "../RecentChat"
import "./styles.scss"
import { ChatContext } from "../../context/chatContext/chatContext"
import { generateCombinedId } from "../../utils/helperMethods/generateId"

export interface IChatHistory {
  id: string
  username: string
  lastMessage: string
  hasSeen: boolean
  timestamp: number
}

const SideMenu: React.FC = (): React.ReactElement => {
  const { user } = useContext(AuthenticationContext)
  const { dispatch } = useContext(ChatContext)
  const [chatHistory, setChatHistory] = useState<IChatHistory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const userDocRef = doc(db, "chatHistory", user!.uid)
    const unSub = onSnapshot(userDocRef, (user) => {
      let previousUserHistory: IChatHistory[] = []
      if (!user.exists()) return
      const data: Record<string, IChatHistory> = user.data()
      Object.keys(data).forEach((id) => {
        const chatHistory: IChatHistory = data[id]
        previousUserHistory.push(chatHistory)
      })

      previousUserHistory.sort((a, b) => b.timestamp - a.timestamp)
      setChatHistory(previousUserHistory)
    })
    return () => {
      unSub()
    }
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

  //This might need to be changed. So that the timestamp is created on message send rather than user clicked
  const handleSelectUser = async (id: string, username: string) => {
    const chatUserLocation = chatHistory.findIndex((c) => c.id === id)
    if (chatUserLocation === -1) return
    const updatedHistory = [
      chatHistory[chatUserLocation],
      ...chatHistory.slice(0, chatUserLocation),
      ...chatHistory.slice(chatUserLocation + 1),
    ]
    setChatHistory(updatedHistory)
    dispatch({ type: "CHANGE_USER", payload: { id: id, username: username } })

    const conversationId = generateCombinedId(user?.uid!, id)

    const response = await getDoc(doc(db, "conversations", conversationId))
    if (!response.exists()) {
      await setDoc(doc(db, "conversations", conversationId), { messages: [] })

      const userDocRef = doc(db, "chatHistory", user!.uid)
      await updateDoc(userDocRef, {
        [conversationId]: {
          id: id,
          username: username,
          lastMessage: "",
          hasSeen: true,
          timestamp: Date.now(),
        } as IChatHistory,
      })
    }
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
                key={a.id}
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
