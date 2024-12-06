import React, { useState } from 'react';

interface CollaboratorRequest {
  content: string;
  type: 'email' | 'query';
}

interface Props {
  onSubmit: (request: CollaboratorRequest) => void;
}

const CollaboratorRequestForm: React.FC<Props> = ({ onSubmit }) => {
  const [request, setRequest] = useState<CollaboratorRequest>({
    content: '',
    type: 'query',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Request Type</label>
        <select
          id="type"
          name="type"
          value={request.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="query">General Query</option>
          <option value="email">Email Content</option>
        </select>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Request Content</label>
        <textarea
          id="content"
          name="content"
          value={request.content}
          onChange={handleChange}
          required
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter your query or paste email content here..."
        ></textarea>
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Analyze Request
      </button>
    </form>
  );
};

export default CollaboratorRequestForm;