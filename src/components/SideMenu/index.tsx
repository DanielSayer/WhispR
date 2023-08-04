import { Search, SentimentDissatisfied } from "@mui/icons-material"
import { InputAdornment, OutlinedInput, Typography } from "@mui/material"
import "./styles.scss"
import RecentChat from "../RecentChat"
import { useState } from "react"

const SideMenu: React.FC = (): React.ReactElement => {
  const data = [
    { name: "Jared Sexy", message: "Hello" },
    { name: "Maxy Taxy", message: "Waddup" },
    { name: "Jonny Boi", message: "Gangser" },
    { name: "Max JM", message: "A hit" },
    { name: "Jo Jo Panini", message: "Ur pretty" },
  ]
  const [search, setSearch] = useState<string>("")
  const filteredData = data.filter((x) =>
    x.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="side-menu">
      <OutlinedInput
        id="Search"
        placeholder="Search"
        size="small"
        className="mb-2"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
      <div style={{ display: "grid", gap: "0.25rem" }}>
        {filteredData.length > 0 ? (
          filteredData.map((a) => (
            <RecentChat name={a.name} mostRecentMessage={a.message} />
          ))
        ) : (
          <div
            style={{
              opacity: 0.5,
              display: "flex",
              marginTop: "1rem",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" color="primary">
              Looks like you have no friends
            </Typography>
            <SentimentDissatisfied />
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenu
