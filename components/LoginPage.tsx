import React, { useState } from 'react';
import { View, User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
  allUsers: User[];
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate, allUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = allUsers.find(user => user.email === email);

    if (foundUser && foundUser.password && password === foundUser.password) {
      onLogin(foundUser);
    } else {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Espace Client</h1>
        <p className="text-lg text-gray-600 mt-2">Connectez-vous pour accéder à vos services.</p>
      </div>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 border rounded-lg w-full"
            required
            placeholder="votre.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-3 border rounded-lg w-full"
            required
            placeholder="••••••••"
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <p className="text-xs text-gray-500 text-center">
            Pour les comptes de démo, le mot de passe est <code className="bg-gray-200 p-1 rounded">password</code>. Les utilisateurs que vous créez auront leur propre mot de passe.
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Connexion
        </button>
      </form>
       <div className="text-center mt-8">
        <button
          onClick={() => onNavigate(View.Home)}
          className="text-blue-600 font-semibold hover:underline"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default LoginPage;