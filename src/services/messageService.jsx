export const getMessages = () => {
  return fetch (`http://localhost:8088/messages?_expand=messages`
).then((res) => res.json())
}

export const newMessage = (userId, messages) => {
  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId, messages),
  }).then((res) => res.json())
}

export const updateMessage = (messageId, newMessage) => {
  return fetch(`http://localhost:8088/messages/${messageId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ message: newMessage})
  }).then((res) => res.json())
}
