import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { ChatState } from '../../context/ChatProvider';

const UserBadgeItem = ({ user, handleFunction }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      px={3}
      py={1}
      borderRadius='lg'
      m={1}
      mb={2}
      variant='solid'
      fontSize={12}
      backgroundColor='#38B2AC'
      color='white'
      cursor='pointer'
      onClick={handleFunction}
    >
      {user.name}{' '}
      {selectedChat?.isGroupChat
        ? user._id === selectedChat.groupAdmin._id && ' - Admin'
        : ''}
      <CloseIcon pl={1} ml={1} />
    </Box>
  );
};

export default UserBadgeItem;
