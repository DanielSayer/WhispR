import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { theme } from "./assets/_muiTheme.ts"
import "./assets/theme.scss"
import { AuthenticationContextProvider } from "./context/authenticationContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthenticationContextProvider>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </AuthenticationContextProvider>
)
