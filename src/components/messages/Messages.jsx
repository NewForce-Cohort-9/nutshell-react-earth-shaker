import React, { useEffect, useState } from 'react';
import { getAllMessages, newMessage, updateMessage } from "../../services/messageService.jsx";
import './Messages.css'; 
import { Messageform } from './MessageForm.jsx';

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageText, setEditingMessageText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); 
  

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    fetchMessages();
  }, []);

  //reverse is not working...
  const fetchMessages = async () => {
    const fetchedMessages = await getAllMessages();
    setMessages(fetchedMessages.reverse());
  };

  const handleNewMessageChange = (e) => {
    setNewMessageText(e.target.value);
  };

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

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="messageContainer" className={isOpen ? 'open' : 'closed'}>
      <div className="header" onClick={toggleContainer}>
        <h3>Messages</h3>
        <button type="button" className="toggle-button">
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>

      {isOpen && (
        <>
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-item ${msg.userId === user?.id ? 'sent-by-user' : ''}`}>
                </div>
                )
                /* {editingMessageId === msg.id ? (
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
              </div>
            ))}
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
      )}
    </div>
  );
}; */