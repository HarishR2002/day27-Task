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

  const handleAddUser = async () => {
    const response = await addUser(newUser);
    setUsers([...users, response.data]);
    setNewUser({ name: '', email: '' });
  };

  const handleEditUser = async (id) => {
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
