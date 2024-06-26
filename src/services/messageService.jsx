export const getAllMessages = () => {
  return fetch (`http://localhost:8088/messages?_expand=user`
).then((res) => res.json())
}

export const newMessage = (message) => {
  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
}).then((res) => res.json())
}

export const updateMessage = (message) => {
  return fetch(`http://localhost:8088/messages/${message.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(message)
})}
