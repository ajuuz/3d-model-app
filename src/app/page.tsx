"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface Model {
  _id: string;
  name: string;
  fileName: string;
  createdAt: string;
}

export default function Dashboard() {
  const [error, setError] = useState('');
  const [models, setModels] = useState<Model[]>([]);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/models');
      const data = await response.json();
      setModels(data.data);
    } catch (err) {
      console.log(err)
      setError('An error occurred while fetching models.');
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <main className="bg-gray-900 text-white min-h-screen font-sans p-8">
      <div className="container mx-auto">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Your Models</h2>
          {models.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {models.map((model) => (
                <div key={model._id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 truncate">{model.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 truncate" title={model.fileName}>{model.fileName}</p>
                  </div>
                  <p className="text-xs text-gray-500 self-end">Uploaded: {new Date(model.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No models uploaded yet. Use the form above to add your first one!</p>
          )}
        </section>
      </div>
    </main>
  );
}
