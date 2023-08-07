interface ErrorCodeToMessageMap {
  [key: string]: string
}

const errorCodeToMessageMap: ErrorCodeToMessageMap = {
  "auth/admin-restricted-operation":
    "This operation is restricted to administrators.",
  "auth/email-change-needs-verification":
    "You need to verify your email after changing it.",
  "auth/email-already-in-use":
    "The provided email is already in use by another account.",
  "auth/invalid-email": "The provided email is not a valid email address.",
  "auth/wrong-password": "The provided password is incorrect.",
  "auth/invalid-phone-number": "The provided phone number is not valid.",
  "auth/invalid-sender": "The sender's information is not valid.",
  "auth/multi-factor-auth-required":
    "Multi-factor authentication is required for this operation.",
  "auth/missing-phone-number":
    "A phone number must be provided for this operation.",
  "auth/user-signed-out": "You have been signed out from your account.",
  "auth/weak-password": "The provided password is too weak.",
  default: "Something went wrong. Please try again later.",
}

export const getErrorMessageFromCode = (errorCode: string): string => {
  return errorCodeToMessageMap[errorCode] || errorCodeToMessageMap["default"]
}
