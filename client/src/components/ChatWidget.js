import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Fab,
  Collapse,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        text: "Thanks for your message! Our AI assistant will help you shortly.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      <Collapse in={isOpen}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 320,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
          }}
        >
          <Box sx={{ 
            p: 2, 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6">Chat Support</Typography>
          </Box>

          <List
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
            }}
          >
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection: 'column',
                  alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    maxWidth: '80%',
                  }}
                >
                  <ListItemText 
                    primary={message.text}
                    secondary={message.timestamp.toLocaleTimeString()}
                    secondaryTypographyProps={{
                      color: message.sender === 'user' ? 'white' : undefined,
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
          </List>

          <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSend} color="primary">
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Paper>
      </Collapse>
    </>
  );
}

export default ChatWidget; 