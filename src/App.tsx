import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppRoutes from "./appRoutes"
import SignUpPage from "./pages/LoginSignUp/SignUpPage"
import LoginPage from "./pages/LoginSignUp/LoginPage"
import HomePage from "./pages/HomePage"
import { useContext } from "react"
import { AuthenticationContext } from "./context/authenticationContext"

interface IProtectedRouteProps {
  children: React.ReactNode
}

const App: React.FC = (): React.ReactElement => {
  const { loginPage, signUpPage, homePage } = AppRoutes
  const { user, authChecked } = useContext(AuthenticationContext)

  console.log(user)

  const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
    children,
  }): React.ReactElement => {
    if (!authChecked) {
      return <></>
    }

    if (!user) {
      return <Navigate to={loginPage} />
    }

    return <>{children}</>
  }

  return (
    <BrowserRouter basename="/whispr">
      <Routes>
        <Route path={signUpPage} element={<SignUpPage />} />
        <Route path={loginPage} element={<LoginPage />} />
        <Route
          path={homePage}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path={"*"}
          element={<Navigate to={AppRoutes.getSignUpPage()} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
