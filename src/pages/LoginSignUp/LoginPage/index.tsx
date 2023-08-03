import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../../appRoutes"
import {
  LoginInformation,
  LoginValidator,
} from "../../../utils/validators/LoginValidator"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const LoginPage: React.FC = (): React.ReactElement => {
  const { register, handleSubmit } = useForm<LoginInformation>({
    resolver: zodResolver(LoginValidator),
  })

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onSubmit = (data: LoginInformation) => {
    navigate(AppRoutes.getHomePage())
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
          label="Username"
          color="primary"
          {...register("username")}
          className="w-75"
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

        <Button
          className="w-50 pill"
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          LOGIN
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
