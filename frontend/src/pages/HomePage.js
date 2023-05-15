import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [chats, setChats] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default HomePage;
