import { zodResolver } from "@hookform/resolvers/zod"
import { Visibility, VisibilityOff } from "@mui/icons-material"
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
  SignUpInformation,
  SignUpValidator,
} from "../../../utils/validators/SignupValidator"
import "../styles.scss"

interface IPasswordVisibilities {
  password: boolean
  confirm: boolean
}

const SignUpPage: React.FC = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInformation>({ resolver: zodResolver(SignUpValidator) })

  const navigate = useNavigate()
  const [showPasswords, setShowPasswords] = useState<IPasswordVisibilities>({
    password: false,
    confirm: false,
  })

  const handleClickShowPassword = () =>
    setShowPasswords((show) => ({ ...show, password: !show.password }))
  const handleClickShowConfirm = () =>
    setShowPasswords((show) => ({ ...show, confirm: !show.confirm }))

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onSubmit = (data: SignUpInformation) => {
    window.alert("YOURE IN")
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
          Create account
        </Typography>
        <TextField
          label="Username"
          color="primary"
          error={errors.username !== undefined}
          helperText={errors.username?.message}
          {...register("username")}
          className="w-75"
        />
        <TextField
          label="Email"
          color="primary"
          error={errors.email !== undefined}
          helperText={errors.email?.message}
          {...register("email")}
          className="w-75"
        />
        <TextField
          className="w-75"
          label="Password"
          type={showPasswords.password ? "text" : "password"}
          error={errors.password !== undefined}
          helperText={errors.password?.message}
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
                  {showPasswords.password ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="w-75"
          label="Confirm Password"
          type={showPasswords.confirm ? "text" : "password"}
          error={errors.passwordVerification !== undefined}
          helperText={errors.passwordVerification?.message}
          {...register("passwordVerification")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirm}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswords.confirm ? <Visibility /> : <VisibilityOff />}
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
          JOIN NOW
        </Button>
        <Typography variant="caption">
          Already have an account?
          <Link
            className="ms-2"
            component="button"
            onClick={() => navigate(AppRoutes.loginPage)}
            color="inherit"
          >
            Log In
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SignUpPage
