import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/conversations');
      setConversations(response.data);
      if (response.data.length > 0) {
        setSelectedConversation(response.data[0]);
      }
    } catch (err) {
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(`/api/conversations/${conversationId}/messages`);
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to load messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/conversations/${selectedConversation.id}/messages`, {
        message: newMessage
      });
      setNewMessage('');
      fetchMessages(selectedConversation.id);
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="messages-page">
      <div className="messages-container">
        <div className="conversations-sidebar">
          <h2>Conversations</h2>
          <div className="conversations-list">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conv)}
              >
                <p className="conversation-name">{conv.name}</p>
                <p className="last-message">{conv.last_message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation && (
            <>
              <div className="chat-header">
                <h2>{selectedConversation.name}</h2>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="messages-list">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.is_own ? 'own' : ''}`}>
                    <div className="message-content">
                      <p>{msg.message}</p>
                      <span className="message-time">{new Date(msg.created_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="message-input-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;