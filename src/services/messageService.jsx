export const getMessages = (messageId) => {
  return fetch (`http://localhost:8088/messages?messageId=${messageId}&_expand=messages`
).then((res) => res.json())
}

export const newMessage = (messages) => {
  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  }).then((res) => res.json())
}