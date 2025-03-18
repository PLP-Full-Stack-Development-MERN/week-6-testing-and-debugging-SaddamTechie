import React, { useState } from 'react';
import axios from 'axios';

function BugForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bugs', { title, description });
      setTitle('');
      setDescription('');
      // Reload the page
    window.location.reload();
    } catch (err) {
      setError('Failed to submit bug');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Report Bug</button>
    </form>
  );
}

export default BugForm;