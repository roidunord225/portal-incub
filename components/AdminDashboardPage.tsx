import React from 'react';
import { View, User } from '../types';
import { LightBulbIcon, BuildingOfficeIcon } from './icons/Icons';

interface AdminDashboardPageProps {
  user: User;
  stats: {
    totalClients: number;
    openTickets: number;
    newLeads: number;
  };
  onNavigate: (view: View) => void;
}

const StatCard: React.FC<{ value: number; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
    <div className="bg-incubtek-orange p-3 rounded-full mr-4 text-white">{icon}</div>
    <div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);


const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ user, stats, onNavigate }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Tableau de bord Administrateur</h1>
        <p className="text-lg text-gray-600">Bienvenue, {user.name}.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard value={stats.newLeads} label="Nouveaux Leads" icon={<i className="fas fa-lightbulb"></i>} />
        <StatCard value={stats.openTickets} label="Tickets Ouverts" icon={<i className="fas fa-ticket-alt"></i>} />
        <StatCard value={stats.totalClients} label="Clients Actifs" icon={<i className="fas fa-users"></i>} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Actions Rapides</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button 
                onClick={() => onNavigate(View.AdminLeads)}
                className="bg-incubtek-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
            >
                <LightBulbIcon /> <span className="ml-2">Gérer les Leads</span>
            </button>
            <button 
                onClick={() => onNavigate(View.AdminHelpdesk)}
                className="bg-incubtek-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
            >
                <i className="fas fa-ticket-alt mr-2"></i> Gérer le Helpdesk
            </button>
             <button 
                onClick={() => onNavigate(View.AdminClients)}
                className="bg-incubtek-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center">
                <BuildingOfficeIcon /> <span className="ml-2">Gérer les Clients</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;