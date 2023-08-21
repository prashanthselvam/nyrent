"use client"

import React, { useState } from 'react';
import { useCubeQuery } from '@cubejs-client/react';
import MyCubeProvider from './cube';
import { DeeplyReadonly, Query } from '@cubejs-client/core';

const NEIGHBORHOODS_QUERY: DeeplyReadonly<Query> = {
  "dimensions": [
    "buildings.neighborhood",
  ],
  "order": {
    "buildings.neighborhood": "asc"
  }
}

function getRentQuery(beds: string, baths: string, neighborhood: string): DeeplyReadonly<Query> {
  return {
    "measures": [
      "rent_history.median_rent",
      "rent_history.p25_rent",
      "rent_history.p75_rent"
    ],
    "filters": [
      {
        "member": "buildings.neighborhood",
        "operator": "equals",
        "values": [
          neighborhood
        ]
      },
      {
        "member": "rent_history.beds",
        "operator": "equals",
        "values": [
          beds
        ]
      },
      {
        "member": "rent_history.baths",
        "operator": "equals",
        "values": [
          baths
        ]
      }
    ]
  }
}

function formatCurrency(input: string): string {
  // Convert the input string to a number
  const numValue = parseFloat(input);

  // Check if the conversion was successful
  if (isNaN(numValue)) {
    // throw new Error('Invalid input: not a valid number');
    return ""
  }

  // Format the number as currency
  const formattedCurrency = numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedCurrency;
}

const Home = () => {
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const { resultSet: neighborhoodsResultSet } = useCubeQuery(NEIGHBORHOODS_QUERY);
  const neighborhoodOptions = neighborhoodsResultSet?.rawData()?.map((row) => row["buildings.neighborhood"]) ?? []

  const { resultSet: rentResultSet, isLoading, error, progress } = useCubeQuery(getRentQuery(beds, baths, location));
  const rawRentData = rentResultSet?.rawData()?.[0] ?? {}

  console.log(rawRentData["rent_history.median_rent"])

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
            <select
              style={{ lineHeight: "initial " }}
              className="mx-2 text-center border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="_______"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {neighborhoodOptions.map((option) => <option value={option}>{option}</option>)}
            </select>

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
              <p className="mt-2 text-2xl font-bold">{formatCurrency(rawRentData["rent_history.median_rent"])}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                Most people are paying between
              </p>
              <div className="mt-2">
                <span className="mt-2 text-2xl font-bold">{formatCurrency(rawRentData["rent_history.p25_rent"])}</span>
                {' '}and{' '}
                <span className="mt-2 text-2xl font-bold">{formatCurrency(rawRentData["rent_history.median_rent"])}</span>
              </div>
            </div>
            <div
              className="cursor-pointer mt-4 text-blue-500 font-semibold"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'See Less...' : 'See More...'}
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

const WrappedHome = () => {
  return <MyCubeProvider><Home /></MyCubeProvider>
}

export default WrappedHome;
