import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './paginas/HomePage';
import Header from './paginas/Components/Header';

const CLIENT_ID = '6a35d344ccb74561a1595f34ad8a24d6';
const CLIENT_SECRET = 'fe2e9efd6c6f4919a51994d73062cb34';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPE = 'user-read-private user-read-email user-top-read';

function App() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const tokenFromStorage = window.localStorage.getItem('token');

    if (!tokenFromStorage && code) {
      console.log("Authorization Code:", code);

      const getToken = async () => {
        try {
          const response = await axios.post(TOKEN_ENDPOINT, new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          if (response.data.access_token) {
            setToken(response.data.access_token);
            window.localStorage.setItem('token', response.data.access_token);
            window.history.pushState({}, null, '/');
          } else {
            console.error('Invalid response format', response);
            setError('Resposta inesperada ao obter o token.');
          }
        } catch (err) {
          console.error('Error fetching access token', err);
          setError('Erro ao obter o token.');
        }
      };

      getToken();
    } else if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  return (
    <div>
      <Header token={token} loginUrl={loginUrl} logout={logout} />
      {token && <HomePage token={token} />}
    </div>
  );
}

export default App;
