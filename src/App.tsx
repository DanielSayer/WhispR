import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppRoutes from "./appRoutes"
import SignUpPage from "./pages/LoginSignUp/SignUpPage"
import LoginPage from "./pages/LoginSignUp/LoginPage"

const App: React.FC = (): React.ReactElement => {
  const { loginPage, signUpPage } = AppRoutes

  return (
    <BrowserRouter basename="/whispr">
      <Routes>
        <Route path={signUpPage} element={<SignUpPage />} />
        <Route path={loginPage} element={<LoginPage />} />

        <Route
          path={"*"}
          element={<Navigate to={AppRoutes.getSignUpPage()} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
