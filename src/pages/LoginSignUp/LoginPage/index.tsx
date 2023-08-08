import { zodResolver } from "@hookform/resolvers/zod"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../../appRoutes"
import { auth } from "../../../firebase"
import { getErrorMessageFromCode } from "../../../utils/firebase/errorCodeMapping"
import {
  LoginInformation,
  LoginValidator,
} from "../../../utils/validators/LoginValidator"

const LoginPage: React.FC = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInformation>({
    resolver: zodResolver(LoginValidator),
  })

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onSubmit = async (data: LoginInformation) => {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate(AppRoutes.getHomePage())
    } catch (error) {
      if (error instanceof FirebaseError) {
        setAuthError(getErrorMessageFromCode(error.code))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="login-card">
      <CardContent className="login-information">
        <Typography
          className="w-75"
          component={"div"}
          variant="h5"
          sx={{ fontWeight: "bold" }}
        >
          Login
        </Typography>
        <TextField
          label="Email"
          color="primary"
          {...register("email")}
          className="w-75"
          error={errors.email !== undefined}
        />

        <TextField
          className="w-75"
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {authError && (
          <Typography color="error" variant="caption">
            {authError}
          </Typography>
        )}

        <Button
          className="w-50 pill"
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <CircularProgress size={25} color="inherit" /> : "LOGIN"}
        </Button>
        <Typography variant="caption">
          Need an account?
          <Link
            className="ms-2"
            component="button"
            onClick={() => navigate(AppRoutes.signUpPage)}
            color="inherit"
          >
            Sign up
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default LoginPage
