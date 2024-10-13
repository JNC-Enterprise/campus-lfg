import React from 'react';
import './Messages.css';
import messages from '../backend/messages.json'


const Messages = () => {
    return(
        <div className='messages'>
        {messages.map((messages, index) => (
          <div className='actual-messages' key={index}>
            <img src={messages.profile} className='profile-pic' />
            <div className='message-text'>
              <b>{messages.groupName}</b>
              <div>{messages.message}</div>
            </div>
          </div>
        ))}
      </div>
    )
}

export default Messages;