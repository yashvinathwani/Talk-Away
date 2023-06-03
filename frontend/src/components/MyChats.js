import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Avatar, Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from '../miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: user.token,
        },
      };

      const { data } = await axios.get('/api/chat', config);

      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{ base: '100%', md: '30%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily='Work sans'
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <GroupChatModal>
          <Button
            display='flex'
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display='flex'
        flexDir='column'
        p={3}
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat) => (
              <Box
                display='flex'
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={
                  selectedChat
                    ? selectedChat._id === chat._id
                      ? '#38B2AC'
                      : '#E8E8E8'
                    : '#E8E8E8'
                }
                color={
                  selectedChat
                    ? selectedChat._id === chat._id
                      ? 'white'
                      : 'black'
                    : 'black'
                }
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
              >
                <Avatar
                  mt='7px'
                  mr={1}
                  size='sm'
                  cursor='pointer'
                  src={
                    !chat.isGroupChat
                      ? chat.users[0]._id === user?._id
                        ? chat.users[1].pic
                        : chat.users[0].pic
                      : 'https://icon-library.com/images/group-of-people-icon-png/group-of-people-icon-png-11.jpg'
                  }
                />

                <Box display='flex' flexDir='column' ml={2}>
                  <Text fontWeight='bold'>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize='s'>
                      <>
                        {chat.latestMessage.sender._id !== user._id
                          ? `${chat.latestMessage.sender.name} : `
                          : ''}
                      </>
                      {chat.latestMessage.content.length > 40
                        ? chat.latestMessage.content.substring(0, 41) + ' ...'
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
