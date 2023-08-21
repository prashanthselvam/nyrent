"use client"

import React, { useState } from 'react';

const Home = () => {
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
    // You can perform any necessary calculations or API calls here
  };

  return (
    <div className="flex flex-col items-center h-screen w-full px-12 pt-8">
      <header className="p-4 text-2xl font-bold w-full">
        NYrent.fyi
      </header>
      <main className="flex flex-col items-center justify-center space-y-12 mt-16 w-full">
        <section className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-center text-4xl leading-loose">
            How much can I expect to pay for a <br />
            <input
              type="number"
              style={{ lineHeight: "initial " }}
              className="w-10 mx-2 text-center border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="___"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
            bed,
            <input
              type="number"
              style={{ lineHeight: "initial " }}
              className="w-10 mx-2 text-center border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="___"
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            />
            bath in
            <input
              type="text"
              style={{ lineHeight: "initial " }}
              className="w-32 mx-2 text-center border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="_______"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            ?
          </h1>
          <button
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Find Out!
          </button>
        </section>
        {showResults && (
          <section className="flex flex-col gap-y-4 mt-24 p-4 bg-gray-200 text-center w-4/6">
            <div>
              <p className="text-lg font-semibold">
                Median rent for a {beds} bed, {baths} bath in {location}
              </p>
              <p className="mt-2 text-2xl font-bold">$4,500</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                Most people are paying between
              </p>
              <div className="mt-2">
                <span className="mt-2 text-2xl font-bold">$3,500</span>
                {' '}and{' '}
                <span className="mt-2 text-2xl font-bold">$5,500</span>
              </div>
            </div>
            <div
              className="cursor-pointer mt-4 text-blue-500 font-semibold"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'See Less...' : 'See More..'}
            </div>
            {/* Expanded content */}
            {expanded && (
              <div className="mt-4 h-24">
                {/* ... Additional information ... */}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
