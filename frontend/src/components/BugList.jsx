import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    try {
      const response = await axios.get('/api/bugs');
      setBugs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bugs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/bugs/${id}`, {
        status: newStatus
      });
      setBugs(bugs.map(bug => 
        bug._id === id ? response.data : bug
      ));
      toast('Status updated successfully');
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      setBugs(bugs.filter(bug => bug._id !== id));
      toast('Bug deleted successfully');
    } catch (err) {
      setError('Failed to delete bug');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bug-list">
      {bugs.length === 0 ? (
        <p>No bugs reported yet</p>
      ) : (
        bugs.map(bug => (
          <div key={bug._id} className="bug-item">
            <h3>{bug.title}</h3>
            <p>{bug.description || 'No description'}</p>
            <select 
              value={bug.status}
              onChange={(e) => handleStatusChange(bug._id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button className='delete-button' onClick={() => handleDelete(bug._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default BugList;