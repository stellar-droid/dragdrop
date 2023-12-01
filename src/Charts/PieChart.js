import React, { useState, useEffect } from 'react';

const EditableHeader = ({ text, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{text}</h1>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

const UserList = ({ users, deleteUser, editUser }) => {
  return (
    <ul>
      {users && users.length > 0 ? (
        users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => editUser(user.id)}>Edit</button>
          </li>
        ))
      ) : (
        <li>No users available</li>
      )}
    </ul>
  );
};

const EditUserForm = ({ user, updateUser, cancelEdit }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editedUser);
    cancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Update User</button>
      <button type="button" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
};

const App = () => {
  // Retrieve users from local storage on initial render
  const initialUsers = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password1' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password2' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editableHeader, setEditableHeader] = useState(
    localStorage.getItem('editableHeader') || 'User Management'
  );

  useEffect(() => {
    // Save users to local storage whenever it changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const editUser = (userId) => {
    setEditingUserId(userId);
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editingUserId ? { ...user, ...updatedUser } : user))
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingUserId(null);
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    cancelEdit(); // Cancel editing if the user being edited is deleted
  };

  const handleHeaderEdit = (newText) => {
    setEditableHeader(newText);
    // Save editableHeader to local storage whenever it changes
    localStorage.setItem('editableHeader', newText);
  };

  return (
    <div>
      <EditableHeader text={editableHeader} onEdit={handleHeaderEdit} />
      {editingUserId !== null ? (
        <EditUserForm
          user={users.find((user) => user.id === editingUserId)}
          updateUser={updateUser}
          cancelEdit={cancelEdit}
        />
      ) : (
        <>
          <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
        </>
      )}
    </div>
  );
};

export default App;
