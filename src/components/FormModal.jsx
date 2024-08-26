
import React, { useState } from 'react';

function FormModal({ onSubmit, onCancel }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventImage, setEventImage] = useState(null); // Cambiado a null
  const [eventDescription, setEventDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl = imagePreview; 
    onSubmit({
      title: eventName,
      date: eventDate,
      image: imageUrl,
      text: eventDescription
    });
    onCancel(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          <label htmlFor='eventName' className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mt-4">Year:</label>
          <input
            type="number"
            id="eventDate"
            name="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700 mt-4">Image:</label>
          <input
            type="file"
            id="eventImage"
            name="eventImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Image preview" className="w-full h-48 object-cover" />
            </div>
          )}

          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mt-4">Description:</label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            rows="4"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
