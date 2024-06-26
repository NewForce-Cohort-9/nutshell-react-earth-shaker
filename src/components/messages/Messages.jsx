import React, { useEffect, useState } from 'react';
import { getAllMessages, newMessage, updateMessage } from "../../services/messageService.jsx";
import './Messages.css'; 


export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageText, setEditingMessageText] = useState('');
  const [editedMessage, setNewEditedMessage] = useState({ })
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [user, setUser] = useState(null); 
  

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('nutshell_user'));
    if (loggedInUser) {
        setUser(loggedInUser);
    }
    fetchMessages();
  }, []);

  //removed .reverse( ) fro setMessages(fetchedMessages.reverse()); and now the new messages appear at the bottom of the container???
  const fetchMessages = async () => {
    const fetchedMessages = await getAllMessages();
     // Sort messages by timestamp in ascending order
     fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setMessages(fetchedMessages);
  };

  const handleNewMessageChange = (e) => {
    setNewMessageText(e.target.value);
  };

  //console error will appear if wsite is not showing user as logged-in
  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const newMessageData = {
      userId: user.id, 
      message: newMessageText, 
      timestamp: new Date().toISOString()
    };
    console.log('Submitting new message:', newMessageData);

    await newMessage(newMessageData);
    setNewMessageText('');
    fetchMessages();
};

  const handleEditMessageChange = (e) => {
    setEditingMessageText(e.target.value);
  };

  const handleEditMessageSubmit = async (e) => {
    e.preventDefault();
    editedMessage.message = editingMessageText
    updateMessage(editedMessage).then(() => {
      getAllMessages().then((response) => {
        setMessages(response)
        setNewEditedMessage({})
          });
    })
  };

  const startEditingMessage = (msgParam) => {
    setIsEditOpen(true)
    setNewEditedMessage(msgParam);

  };

  const cancelEditing = () => {
    setNewEditedMessage({})
  };

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditContainer = () => {
    setIsEditOpen(!isEditOpen);
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
            {messages?.map((msg) => (
              <div key={msg.id} className={`message-item ${msg.userId === user?.id ? 'sent-by-user' : ''}`}>
                {editedMessage.id === msg.id ? (
                  <form onSubmit={handleEditMessageSubmit} className="edit-form">
                    <input
                      type="text"
                      value={editingMessageText}
                      onChange={handleEditMessageChange}
                      required
                    />
                    {/* */}
                    <div>
                      <button className="update-button" type="submit">Update</button>
                      <button type="button" onClick={cancelEditing}>Cancel</button>
                    </div>
                    </form>
                ) : (
                  <div className="message-content">
                    <p>{msg.message}</p>
                    <span className="username">{msg.user.username}</span>
                    <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                )}
                <div className="message-actions">
                  {/*Ensures that only logged-in user cna edit their msg*/}
                  {msg.userId === user?.id && (
                    <button onClick={() => startEditingMessage(msg)} className="edit-button">
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
};