import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../firebase"

export interface IAuthenticationContextType {
  user: User | null
  authChecked: boolean
}

export const AuthenticationContext = createContext<IAuthenticationContextType>({
  user: null,
  authChecked: false,
})

interface IAuthenticationContextProviderProps {
  children: React.ReactNode
}

export const AuthenticationContextProvider: React.FC<
  IAuthenticationContextProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setAuthChecked(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthenticationContext.Provider value={{ user, authChecked }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
