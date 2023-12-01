import React, { useState } from 'react';

const UserList = ({ users, deleteUser }) => {
  return (
    <ul>
      {users && users.length > 0 ? (
        users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))
      ) : (
        <li>No users available</li>
      )}
    </ul>
  );
};

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password1' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password2' },
  ]);

  const addUser = (newUser) => {
    // Assuming you have some logic to generate a unique ID for the new user
    newUser.id = Math.max(...users.map((user) => user.id), 0) + 1;
    setUsers([...users, newUser]);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserList users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
