import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppRoutes from "./appRoutes"
import LoginPage from "./pages/LoginPage"

const App: React.FC = (): React.ReactElement => {
  const { loginPage } = AppRoutes

  return (
    <BrowserRouter basename="/whispr">
      <Routes>
        <Route path={loginPage} element={<LoginPage />} />

        <Route
          path={"*"}
          element={<Navigate to={AppRoutes.getLoginPage()} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
