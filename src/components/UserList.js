import React, { useEffect, useState } from 'react';
import { getUsers, addUser, editUser, deleteUser } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  // Prevent adding users without valid inputs
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert('Please provide a valid name and email.');
      return;
    }
    const response = await addUser(newUser);
    setUsers([...users, response.data]);
    setNewUser({ name: '', email: '' });
  };

  // Edit existing user
  const handleEditUser = async (id) => {
    if (!selectedUser.name || !selectedUser.email) {
      alert('Please provide valid data to edit.');
      return;
    }
    const response = await editUser(id, selectedUser);
    setUsers(users.map(user => user.id === id ? response.data : user));
    setEditMode(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditClick = (user) => {
    setEditMode(true);
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* Form for adding new users */}
      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* User list and editing options */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editMode && selectedUser?.id === user.id ? (
              <>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
                <button onClick={() => handleEditUser(user.id)}>Save</button>
                <button onClick={() => {
                  setEditMode(false);
                  setSelectedUser(null);
                }}>Cancel</button>
              </>
            ) : (
              <>
                <span>{user.name} - {user.email}</span>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
