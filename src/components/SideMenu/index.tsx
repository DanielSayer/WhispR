import { Search } from "@mui/icons-material"
import { InputAdornment, OutlinedInput } from "@mui/material"
import "./styles.scss"

const SideMenu: React.FC = (): React.ReactElement => {
  return (
    <div className="side-menu">
      <OutlinedInput
        id="Search"
        placeholder="Search"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
    </div>
  )
}

export default SideMenu
