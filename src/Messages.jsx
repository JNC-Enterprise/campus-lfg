import './Messages.css';
import messages from '../backend/mock/messages.json'


const Messages = () => {
    return(
        <div className='messages'>
        {messages.map((messages, index) => (
          <a className='actual-messages' key={index} href=".">
            <img src={messages.profile} className='profile-pic' />
            <div className='message-text'>
              <b>{messages.groupName}</b>
              <div>{messages.message}</div>
            </div>
          </a>
        ))}
      </div>
    )
}

export default Messages;