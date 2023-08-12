export const generateCombinedId = (
  currentUserId: string,
  messageReceiverId: string
): string => {
  return currentUserId > messageReceiverId
    ? `${currentUserId}${messageReceiverId}`
    : `${messageReceiverId}${currentUserId}`
}
