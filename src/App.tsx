import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppRoutes from "./appRoutes"
import SignUpPage from "./pages/LoginPage"

const App: React.FC = (): React.ReactElement => {
  const { loginPage, signUpPage } = AppRoutes

  return (
    <BrowserRouter basename="/whispr">
      <Routes>
        <Route path={signUpPage} element={<SignUpPage />} />

        <Route
          path={"*"}
          element={<Navigate to={AppRoutes.getLoginPage()} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
