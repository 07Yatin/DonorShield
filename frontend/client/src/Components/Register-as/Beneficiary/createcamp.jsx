import React, { useState } from 'react';
import './createcampaign.css';
import { useHistory } from 'react-router-dom';  // React Router v5 useHistory hook
import announce from './announce.png';
import { createProject } from '../../../services/blockchain';
import { toast, ToastContainer } from 'react-toastify';

export default function Createcamp() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();  // useHistory for programmatic navigation

  const toTimeStamp = (dateString) => {
    const dateObj = Date.parse(dateString);
    return dateObj / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !amount || !imageURL || !date) return;

    const params = {
      title,
      description,
      imageURL,
      amount,
      expiresAt: toTimeStamp(date),
    };

    try {
      setLoading(true);
      // Assuming createProject returns an object containing the project ID or other necessary info
      const response = await createProject(params); 
      toast.success('Project created successfully', { position: 'top-center', theme: 'colored' });

      // Reset form fields
      setTitle('');
      setDescription('');
      setImageURL('');
      setAmount('');
      setDate('');

      // Navigate to the newly created project's description page
      history.push(`/description/${response.id}`);  // Redirect using history.push

    } catch (error) {
      toast.error('Error creating project', { position: 'top-center', theme: 'colored' });
    } finally {
      setLoading(false);  // Reset the loading state after the request completes
    }
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <h2>
          Create New Campaign &nbsp;&nbsp;<img src={announce} alt="" />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="formbold-mb-5">
            <label className="formbold-form-label">Campaign Name</label>
            <input
              type="text"
              name="title"
              id="name"
              placeholder="Enter Campaign Name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="formbold-form-input"
              required
            />
          </div>

          <div className="formbold-mb-5 formbold-pt-3">
            <label className="formbold-form-label formbold-form-label-2">Campaign Description</label>
            <div className="flex flex-wrap formbold--mx-3">
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="text"
                    name="description"
                    id="area"
                    placeholder="Write Campaign Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="formbold-form-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="formbold-mb-5">
            <label className="formbold-form-label">Image URL</label>
            <input
              type="url"
              name="imageURL"
              id="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              className="formbold-form-input"
              required
            />
          </div>

          <div className="formbold-mb-5">
            <label className="formbold-form-label">Target Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter Target Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="formbold-form-input"
              required
            />
          </div>

          <div className="formbold-mb-5">
            <label className="formbold-form-label">End Date</label>
            <input
              type="date"
              name="date"
              id="date"
              placeholder="Enter End Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="formbold-form-input"
              required
            />
          </div>

          <div>
            <button type="submit" className="formbold-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
