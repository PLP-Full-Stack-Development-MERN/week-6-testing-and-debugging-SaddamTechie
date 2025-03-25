import React, { useState } from 'react';
import axios from 'axios';

function BugForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bugs', { title, description });
      setTitle('');
      setDescription('');
      setShowModal(false);
      // Reload the page
      window.location.reload();
    } catch (err) {
      setError('Failed to submit bug');
    }
  };

  return (
    <>
    <div className='button-div'>
      <button className="add-button" onClick={() => setShowModal(true)}>Add Bug</button>
    </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Report Bug</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleSubmit}>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BugForm;
