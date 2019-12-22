
const ChatList = 'ChatList'

// 聊天记录
export function getChatList () {
  return JSON.parse(localStorage.getItem(ChatList))
}

export function setChatList (newChatList) {
  return localStorage.setItem(ChatList, JSON.stringify(newChatList))
}

export function removeChatList () {
  return localStorage.removeItem(ChatList)
}
