import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Identifiants invalides');
      const data = await res.json();
      onLogin(data.token, { email, role: data.role });
      navigate('/booking');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('redirectToBooking')) {
      navigate('/booking');
      localStorage.removeItem('redirectToBooking');
    }
  }, [navigate]);

  // Redirection dès que le login réussit
  useEffect(() => {
    if (onLogin && typeof onLogin === 'function') {
      const handler = (token, user) => {
        localStorage.setItem('redirectToBooking', '1');
      };
      // Pas d'abonnement réel ici, la redirection est gérée via le set dans handleSubmit
    }
  }, [onLogin]);


  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-logo"><span>Billeterie</span></div>
        <h2>Connexion à votre espace</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="login-error">{error}</div>}
          <Button type="submit" className="login-btn">Se connecter</Button>
        </form>
        <div className="login-register-link">
          <span>Pas encore inscrit ? </span>
          <a href="/register">Créer un compte</a>
        </div>
      </div>
    </div>
  );
}
export default Login

