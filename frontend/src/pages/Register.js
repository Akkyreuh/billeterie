import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import './Register.css';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'USER' })
      });
      if (!res.ok) throw new Error('Erreur lors de l\'inscription');
      setSuccess(true);
      onRegister && onRegister();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-root">
      <div className="register-container">
        <div className="register-logo"><span>Billeterie</span></div>
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">Inscription réussie !</div>}
          <Button type="submit" className="register-btn">S'inscrire</Button>
        </form>
        <div className="register-login-link">
          <span>Déjà inscrit ? </span>
          <a href="/login">Se connecter</a>
        </div>
      </div>
    </div>
  );
}
