import React from 'react';
import { View, User } from '../types';
import { ShieldCheckIcon } from './icons/Icons';

interface HeaderProps {
  user: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
  
  const getDashboardView = () => {
    if (!user) return View.Home;
    switch(user.role) {
      case 'admin': return View.AdminDashboard;
      case 'support': return View.SupportDashboard;
      case 'client': return View.Dashboard;
      default: return View.Home;
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(View.Home)}>
            <div className="bg-incubtek-orange p-2 rounded-md">
                <ShieldCheckIcon />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-800">Incubtek</span>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">Bonjour, {user.name.split(' ')[0]}</span>
                <button
                  onClick={() => onNavigate(getDashboardView())}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Tableau de bord
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-incubtek-orange rounded-md hover:bg-orange-600"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate(View.Login)}
                className="bg-incubtek-orange text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Espace Client
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;