import React, { useState } from 'react';

const AddUserForm = ({ addUser }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form fields if needed
    // ...

    // Pass the user data to the parent component or perform other actions
    addUser(user);

    // Reset the form
    setUser({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={user.password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;