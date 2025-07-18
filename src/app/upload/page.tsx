"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface Model {
  _id: string;
  name: string;
  fileName: string;
  createdAt: string;
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a .glb file.');
      return;
    }
    if (name.trim() === '') {
      setError('Please enter a model name.');
      return;
    }

    setIsUploading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name.trim());

    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
      setName('');
      setFile(null);
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen font-sans p-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold">3D Model Hub</h1>
          <p className="text-gray-400 mt-2">Upload and manage your .glb models</p>
        </header>

        {/* Upload Section */}
        <section className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upload New Model</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Model Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Astronaut, Vintage Car"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">Model File (.glb)</label>
                <input 
                    id="file-upload"
                    type="file" 
                    onChange={handleFileChange} 
                    accept=".glb"
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition cursor-pointer" 
                />
            </div>
            <button 
              type="submit" 
              disabled={isUploading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-300"
            >
              {isUploading ? 'Uploading...' : 'Upload Model'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </section>
      </div>
    </main>
  );
}
