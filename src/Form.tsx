import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');

    try {
      // Replace this URL with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwkCwcZmbsfAXW32lo138ZCgE88Mb88LMdRA-xeYjISqjDa6Pp5mbw9Tq_ljP2IFUMF/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({...formData, pageOrigin: window.location.origin, email: 'office@wicketrecords.com'}),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors'
      });

      console.log(response);
      
      // Since no-cors mode doesn't give us response details,
      // we'll assume it was successful if no error was thrown
      setStatus('Success! Your data has been submitted.');
      setFormData({ name: '' });
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">LW Proof Of Concept</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      
      {status && (
        <div className={`mt-4 p-3 rounded-md ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status}
        </div>
      )}
    </div>
  );
}