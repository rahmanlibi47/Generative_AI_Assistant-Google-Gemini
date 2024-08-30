import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Chip, Paper } from '@mui/material';
import { styled } from '@mui/system';

const ChatWindow = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Default shadow value
}));

const ChatBox = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const InputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ChatMessage = styled(Chip)(({ type, theme }) => ({
  alignSelf: type === 'user' ? 'flex-end' : 'flex-start',
  backgroundColor: type === 'user' ? '#007bff' : '#e0e0e0',
  color: type === 'user' ? '#fff' : '#000',
  maxWidth: '75%', // Limit the width to prevent overflow
  wordBreak: 'break-word',
}));

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (message.trim() === '') return;

    const newChat = [...chat, { text: message, type: 'user' }];
    setChat(newChat);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/chat', { message });
      setChat([...newChat, { text: response.data.response, type: 'bot' }]);
    } catch (error) {
      setChat([...newChat, { text: 'Error: Could not get a response from the server.', type: 'bot' }]);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f0f0' }}>
      <ChatWindow>
        <ChatBox>
          {chat.map((entry, index) => (
            <ChatMessage
              key={index}
              label={entry.text}
              type={entry.type}
              variant="filled" // Use filled variant for a solid background
            />
          ))}
        </ChatBox>
        <InputArea>
          <TextField
            variant="outlined"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
            Send
          </Button>
        </InputArea>
      </ChatWindow>
    </Box>
  );
}

export default App;
