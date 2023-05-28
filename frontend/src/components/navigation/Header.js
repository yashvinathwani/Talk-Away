import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ProfileModal from '../../miscellaneous/ProfileModal';
import { ChatState } from '../../context/ChatProvider';
import { useEffect } from 'react';

const Header = () => {
  const { search, setSearch } = useState('');
  const { searchResult, setSearchResult } = useState([]);
  const { loading, setLoading } = useState(false);
  const { loadingChat, setLoadingChat } = useState();
  const history = useHistory();

  const { user } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
        <Tooltip label='Search Users to Chat' hasArrow placement='bottom-end'>
          <Button variant='ghost'>
            <i className='fas fa-search'></i>
            <Text display={{ base: 'none', md: 'flex' }} px='4'>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl' fontFamily='Work sans'>
          Talk-Away
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize='2xl' m={1} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size='sm'
                cursor='pointer'
                // name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default Header;
