import { useState, useEffect, useRef } from 'react';
import './Messages.css';
import mockMessages from '../../backend/mock/messageOverlay.json';

const Messages = () => {
  const [groups, setGroups] = useState([]); // List of groups the user is in
  const [selectedGroup, setSelectedGroup] = useState(null); // Group that is currently selected
  const [chatMessages, setChatMessages] = useState([]); // Messages for the selected group
  const [loading, setLoading] = useState(true); // Loading state for fetching groups
  const [error, setError] = useState(null); // Error state for fetching groups

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  // Get the userId and token from localStorage
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId'); // Or parse userId from the token

  // Fetch groups for the logged-in user
  useEffect(() => {
    const fetchGroups = async () => {
      if (!token || !userId) {
        setError('User is not authenticated');
        return;
      }

      try {
        const response = await fetch(`/api/groups/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGroups(data);
        } else {
          setError('Failed to fetch groups.');
        }
      } catch (err) {
        setError('An error occurred while fetching groups.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [userId, token]);


  // Fetch messages for the selected group
  useEffect(() => {
    if (selectedGroup) {
      const fetchMessages = async () => {
        if (!token) {
          setError('User is not authenticated');
          return;
        }

        try {
          const response = await fetch(`/api/messages/${selectedGroup.group_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setChatMessages(data.length > 0 ? data : mockMessages);
          } else {
            console.error('Failed to fetch messages.');
            setChatMessages(mockMessages);
          }
        } catch (err) {
          console.error('Error fetching messages:', err);
          setChatMessages(mockMessages);
        }
      };

      fetchMessages();
    }
  }, [selectedGroup, token]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle input submit (send a new message)
  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      const newMessage = {
        profile: selectedGroup.profile,
        groupName: selectedGroup.groupName,
        message: inputValue.trim(),
        sender: true,
      };

      setChatMessages(prevMessages => [...prevMessages, newMessage]);
      setInputValue('');
    }
  };

  // Handle key press (send on Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
    if (e.key === 'Escape') {
      setSelectedGroup(null); // Close the overlay when Escape is pressed
    }
  };

  // Handle selecting a group
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className='messages'>
      {loading && <p>Loading groups...</p>}
      {error && <p>{error}</p>}

      {/* Left side: display groups */}
      <div className='group-list'>
        {groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.group_id}
              className='group-item'
              onClick={() => handleGroupSelect(group)}
            >
              <div className='group-name'>{group.group_name}</div>
            </div>
          ))
        ) : (
          <div className='no-groups'>
            <p>You are not in any groups yet.</p>
          </div>
        )}
      </div>

      {/* Right side: display messages for the selected group */}
      {selectedGroup && (
        <div className='message-overlay'>
          <div className='message-header-popup'>
            <div className='cross-exit'>
              <button className='cross-exit-button' onClick={() => setSelectedGroup(null)}>X</button>
            </div>
            <span className='group-name-popup'>{selectedGroup.group_name}</span>
          </div>

          <div className='messages-container'>
            {chatMessages.length > 0 ? (
              chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`message-bubble ${message.sender ? 'sender' : 'receiver'}`}
                >
                  {message.message}
                </div>
              ))
            ) : (
              <div>No messages yet</div>
            )}
          </div>

          <div className='message-box'>
            <input
              ref={inputRef}
              className='input-box'
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
