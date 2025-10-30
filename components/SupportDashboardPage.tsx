import React from 'react';
import { View, User, Ticket, TicketStatus, Company } from '../types';

interface SupportDashboardPageProps {
  user: User;
  tickets: Ticket[];
  companies: Company[];
  allUsers: User[];
  onNavigate: (view: View, data?: string) => void;
}

const StatCard: React.FC<{ value: number; label: string; icon: string; color: string }> = ({ value, label, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center">
      <div className={`p-3 rounded-full mr-4 text-white ${color}`}>
        <i className={`fas ${icon} fa-lg`}></i>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
);

const getStatusColor = (status: TicketStatus) => {
    switch(status) {
        case 'Nouveau': return 'bg-orange-100 text-orange-800';
        case 'En cours': return 'bg-yellow-100 text-yellow-800';
        case 'En attente': return 'bg-purple-100 text-purple-800';
        case 'Résolu': return 'bg-green-100 text-green-800';
        case 'Fermé': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const formatDateTime = (isoString: string) => new Date(isoString).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });

const SupportDashboardPage: React.FC<SupportDashboardPageProps> = ({ user, tickets, onNavigate, companies, allUsers }) => {
  const sortedTickets = [...tickets].sort((a, b) => {
    // Prioritize 'Nouveau' and 'En cours'
    const statusPriority = (status: TicketStatus) => {
      if (status === 'Nouveau') return 1;
      if (status === 'En cours') return 2;
      return 3;
    };
    if (statusPriority(a.status) !== statusPriority(b.status)) {
        return statusPriority(a.status) - statusPriority(b.status);
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  });

  const openTickets = tickets.filter(t => t.status === 'Nouveau' || t.status === 'En cours').length;
  const resolvedToday = tickets.filter(t => t.status === 'Résolu' && new Date(t.updatedAt).toDateString() === new Date().toDateString()).length;

  const getCompanyName = (companyId: string) => companies.find(c => c.id === companyId)?.name || 'N/A';
  const getRequesterName = (userId: string) => allUsers.find(u => u.id === userId)?.name || 'N/A';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Tableau de Bord Support</h1>
        <p className="text-lg text-gray-600">Bienvenue, {user.name.split(' ')[0]}. Voici vos tickets assignés.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard value={openTickets} label="Mes Tickets Ouverts" icon="fa-ticket-alt" color="bg-incubtek-orange" />
        <StatCard value={resolvedToday} label="Résolus Aujourd'hui" icon="fa-check-circle" color="bg-incubtek-green" />
      </div>

      <div className="bg-white rounded-xl shadow-lg">
         <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 p-6">Ma file de travail</h2>
         {sortedTickets.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {sortedTickets.map(ticket => (
                        <li key={ticket.id} onClick={() => onNavigate(View.AdminTicketDetail, ticket.id)} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 truncate">{ticket.title}</p>
                                <p className="text-sm text-gray-500">
                                    {getCompanyName(ticket.companyId)} - {getRequesterName(ticket.requesterId)} | Dernière mise à jour : {formatDateTime(ticket.updatedAt)}
                                </p>
                            </div>
                            <div className="flex items-center ml-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                                <i className="fas fa-chevron-right text-gray-400 ml-4 hidden sm:block"></i>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 p-6 text-center">Vous n'avez aucun ticket assigné pour le moment. Excellent travail !</p>
            )}
      </div>
    </div>
  );
};

export default SupportDashboardPage;