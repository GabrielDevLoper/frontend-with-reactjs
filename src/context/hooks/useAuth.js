import { useState, useEffect } from 'react';
import api from '../../services/api';
import history from '../../history';
import Swal from 'sweetalert2';

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

    if (data.messageAlert) {
      Swal.fire('Erro', `${data.messageAlert}`, 'error');
      history.push('/sign-in');
    }

    const { token, username: name, id, role } = data;

    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('username', name);
      localStorage.setItem('id', id);
      localStorage.setItem('role', role);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/dashboard');
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
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
