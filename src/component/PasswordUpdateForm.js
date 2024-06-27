// PasswordUpdateForm.js
import React, { useState } from 'react';
import './PasswordUpdateForm.css';

const PasswordUpdateForm = ({ onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ currentPassword, newPassword });
  };

  return (
    <form className="password-update-form" onSubmit={handleSubmit}>
      <h2>Update Password</h2>
      <div className="form-group">
        <label htmlFor="current-password">Current Password</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Password</button>
    </form>
  );
};

export default PasswordUpdateForm;
