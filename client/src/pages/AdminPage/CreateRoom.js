import React, { useState } from 'react';
import axios from 'axios';
import './CreateRoom.css';

const CreateRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/roombook/createRoom', {
        roomId,
        type,
      });

      console.log(response.data);
      alert('Room created successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the room');
    }
  };

  return (
    <div className="create-room">
      <h1>Create Room</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Room ID:
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select...</option>
            <option value="double">Double</option>
          </select>
        </label>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoom;
