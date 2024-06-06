import "./Messages.css"
import { getMessages } from "../../services/messageService.jsx"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Messages = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  const handleMessage = (e) => {
    e.preventDefault()
getMessages(message).then((foundMessages) => {
  if (foundMessages.length === 1) {
    const userId = foundMessages[0]
    localStorage.setItem(
      "nutshell_user",
      JSON.stringify({
        id: userId
      })
    )
    navigate("/")
  } 
})
  }

  const newMessage = (evt) => {
    const copy = { ...user}
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

return (
  <main>
    <button className="open-btn" 
    onClick={"openChatWindow()"}>
      <i className="fa fa-comment"></i>Chat
      </button>

    <div className="chat-popup" id="chat-form-container">
      <form action="#" 
      className="form-container" 
      onSubmit={handleMessage}>
        <div className="chat-window-head">

          <h4><i className="fa fa-comment"></i>Chat Window</h4>

          <span className="close-btn" 
          onClick={"closeChatWindow()"}>
            <i className="fa fa-times"></i>
            </span>
        </div>

        <div className="msg-container">
          <div className="msg">
            <p>Hey, how are ya?</p>
            <span>09:34pm</span>
          </div>
        </div>

        <div className="chat-box-container">
          <div className="chat-box">
            <input 
            type="text"
            onChange={newMessage} 
            placeholder="Type your message..." 
            className="msg" 
            required 
            />
            <button type="submit" className="btn"><i className="fa fa-chevron-circle-right send-btn"></i></button>
          </div>
        </div>
      </form>
    </div>
  </main>
)
}