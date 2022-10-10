import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socket from '../../socket';

const UserList = ({ display, userList, questionList, deleteQuestion }) => {
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    socket.on('FE-receive-message', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {
    scrollToBottom()
  }, [msg])

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }


  return (
    <ChatContainer className={display ? '' : 'width0'}>
      <TopHeader>User list</TopHeader>
      <ChatArea>
        <MessageList>
          {
            userList && userList.map((row, idx) => {
              const { userName } = row.info;
              return (<Message key={idx}> {userName} </Message>);
            })}
          <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef}/>
        </MessageList>
      </ChatArea>

    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  hieght: 100%;
  background-color: #f4f4f4;
  transition: all 0.5s ease;
  overflow: hidden;
  color:#222;
`;

const TopHeader = styled.div`
  width: 100%;
  margin-top: 15px;
  font-weight: 600;
  font-size: 20px;
  color: black;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 83%;
  max-height: 83%;
  overflow-x: hidden;
  overflow-y: auto;
  border-top:1px solid #ccc;
 
`;

const MessageList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #454552;
`;

const Message = styled.div`
  // width: 100%;
  font-size: 16px;
  margin-top:0px;
  margin-bottom: 10px;
  margin-right:10px;
  margin-left:10px;
  text-align: left;
  background-color:#ffffff;
  padding: 10px;
  border-radius:5px;
  font-size:20px;
  box-shadow: 0px 6px 11px 3px #f5e1e1;
  &:hover{
    box-shadow: 0px 6px 11px 3px #a0e0e0;
     background-color:#fafafa;
  }
`;

export default UserList;
