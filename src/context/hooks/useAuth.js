import { useState, useEffect } from 'react';
import api from '../../services/api';
import history from '../../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(username, password) {
    const { data } = await api.post('/sessions', {
      username,
      password
    });

    const { token, username: name, id, role } = data;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('username', name);
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push('/dashboard');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    api.defaults.headers.Authorization = undefined;
    history.push('/sign-in');
  }

  return {
    handleLogin,
    handleLogout,
    authenticated,
    loading
  };
}
