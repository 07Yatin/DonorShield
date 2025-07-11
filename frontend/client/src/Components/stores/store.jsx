// store.js
import { useState } from 'react';

// Example for state management (you might already have these in place)
export const useGlobalState = (key) => {
  const [state, setState] = useState(localStorage.getItem(key));
  return [state, (newState) => {
    setState(newState);
    localStorage.setItem(key, newState);
  }];
};

// Dummy example functions for wallet and project management
export const isWallectConnected = () => {
  // Check if wallet is connected (use actual logic for checking wallet connection)
  return window.ethereum && window.ethereum.selectedAddress;
};

export const loadProjects = () => {
  // Fetch or load projects from blockchain or API
  console.log('Projects are being loaded...');
};

export const connectWallet = () => {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.log('Wallet connected:', accounts[0]);
        // Update the global state or trigger any related logic
      })
      .catch((error) => console.error('Error connecting wallet:', error));
  } else {
    console.error('No Ethereum wallet detected');
  }
};

// Other exports as needed (truncate, daysRemaining, etc.)
export const truncate = (str, start = 4, end = 4, totalLength = 11) => {
  return str.slice(0, start) + '...' + str.slice(-end);
};

export const daysRemaining = (timestamp) => {
  const currentTime = new Date().getTime() / 1000; // current timestamp in seconds
  const remainingTime = timestamp - currentTime;
  const remainingDays = Math.floor(remainingTime / (60 * 60 * 24)); // Calculate remaining days
  return remainingDays;
};
