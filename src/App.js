import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './paginas/HomePage';
import Header from './paginas/Components/Header';

const CLIENT_ID = '230be2f46909426b8b80cac36446b52a';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SCOPE = 'user-read-private user-read-email user-top-read';

function App() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const tokenFromStorage = window.localStorage.getItem('token');

    if (accessToken) {
      setToken(accessToken);
      window.localStorage.setItem('token', accessToken);
      window.history.pushState({}, null, '/');
    } else if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    }
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  return (
    <div>
      <Header token={token} loginUrl={window.location.href} logout={logout} />
      {token && <HomePage token={token} />}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
