import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      history.push('https://talk-away.onrender.com/chats');
    }
  }, [history, localStorage.getItem('userInfo')]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text fontSize='4xl' fontFamily='Work Sans' textAlign='center'>
          Talk-Away
        </Text>
      </Box>
      <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
