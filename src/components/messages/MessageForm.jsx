import React, { useState } from "react";
import { newMessage, updateMessage } from "../../services/messageService.jsx";


export const MessageForm = () => {
  const [newMessageText, setNewMessageText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageText, setEditingMessageText] = useState('');


  //Data is not being retrieved for some reason
  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    if (user) {
    await newMessage({
      userId: user.id, 
      username: user.name, 
      message: newMessageText, 
      timestamp: new Date().toISOString() });
    setNewMessageText('');
    fetchMessages();
  } else {
    console.error('User data not available');
  }
};

const handleEditMessageChange = (e) => {
  setEditingMessageText(e.target.value);
};

const handleEditMessageSubmit = async (e) => {
  e.preventDefault();
  await updateMessage(editingMessageId, { message: editingMessageText, timestamp: new Date().toISOString() });
  setEditingMessageId(null);
  setEditingMessageText('');
  fetchMessages();
};

const startEditingMessage = (messageId, currentText) => {
  setEditingMessageId(messageId);
  setEditingMessageText(currentText);
};

const cancelEditing = () => {
  setEditingMessageId(null);
  setEditingMessageText('');
};

return (
  <>
  {editingMessageId === msg.id ? (
    <form onSubmit={handleEditMessageSubmit} className="edit-form">
      <input
        type="text"
        value={editingMessageText}
        onChange={handleEditMessageChange}
        required
      />
      <div>
        <button className="update-button" type="submit">Update</button>
        <button type="button" onClick={cancelEditing}>Cancel</button>
      </div>
    </form>
    ) : (
      <div className="message-content">
        <p>{msg.message}</p>
        <span className="username">{msg.username}</span>
        <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
      </div>
    )}
    <div className="message-actions">
      {editingMessageId !== msg.id && (
        <button onClick={() => startEditingMessage(msg.id, msg.message)} className="edit-button">
          Edit
        </button>
      )}
    </div>
  <form onSubmit={(e) => handleNewMessageSubmit(e, user?.id, user?.name)} className="new-message-form">
    <input
      type="text"
      value={newMessageText}
      onChange={handleNewMessageChange}
      placeholder="New message"
      required
    />
    <button type="submit">Submit</button>
  </form>
</>
)
}