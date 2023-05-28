import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/navigation/Header';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import { ChatState } from '../context/ChatProvider';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: '100%' }}>
      {user && <Header />}
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
