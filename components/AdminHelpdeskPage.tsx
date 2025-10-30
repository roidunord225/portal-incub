import React, { useState } from 'react';
import { Ticket, TicketStatus, TicketType, View, User, Company } from '../types';

interface AdminHelpdeskPageProps {
  tickets: Ticket[];
  users: User[];
  companies: Company[];
  onUpdateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  onAssignTicket: (ticketId: string, assigneeId: string) => void;
  onNavigate: (view: View, ticketId: string) => void;
  onBack: () => void;
}

const TICKET_STATUSES: TicketStatus[] = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];
const TICKET_TYPES: TicketType[] = ['Incident', 'Demande'];

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

const getTypeColor = (type: TicketType) => {
    switch(type) {
        case 'Incident': return 'bg-orange-100 text-orange-800';
        case 'Demande': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const AdminHelpdeskPage: React.FC<AdminHelpdeskPageProps> = ({ tickets, users, companies, onUpdateTicketStatus, onAssignTicket, onNavigate, onBack }) => {
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'Tous'>('Tous');
  const [filterType, setFilterType] = useState<TicketType | 'Tous'>('Tous');
  const [filterCompany, setFilterCompany] = useState<string>('Tous');

  const sortedTickets = [...tickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const assignableUsers = users.filter(u => u.role === 'support' || u.role === 'admin');

  const filteredTickets = sortedTickets.filter(ticket => {
    if (filterStatus !== 'Tous' && ticket.status !== filterStatus) return false;
    if (filterType !== 'Tous' && ticket.type !== filterType) return false;
    if (filterCompany !== 'Tous' && ticket.companyId !== filterCompany) return false;
    return true;
  });
  
  const getUserName = (userId: string) => users.find(u => u.id === userId)?.name || 'Inconnu';
  const getCompanyName = (companyId: string) => companies.find(c => c.id === companyId)?.name || 'Inconnu';

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Helpdesk</h1>
          <p className="text-lg text-gray-600">Gestion des tickets de support.</p>
        </div>
        <button onClick={onBack} className="text-incubtek-orange font-semibold hover:underline">
          <i className="fas fa-arrow-left mr-2"></i>
          Retour au tableau de bord
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
        <label className="font-semibold">Filtrer par :</label>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="Tous">Tous les statuts</option>
          {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="Tous">Tous les types</option>
          {TICKET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select 
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="Tous">Toutes les sociétés</option>
          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Sujet</th>
              <th className="p-4 font-semibold">Client</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Assigné à</th>
              <th className="p-4 font-semibold">Statut</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className={`border-b transition-colors ${ticket.type === 'Incident' ? 'bg-orange-50 hover:bg-orange-100' : 'hover:bg-gray-50'}`}>
                <td className="p-4">
                  <p className="font-medium text-gray-800">{ticket.title}</p>
                  <p className="text-sm text-gray-500">#{ticket.id.slice(0, 8)} - Créé le {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}</p>
                </td>
                <td className="p-4">
                    <div className="font-medium text-gray-800">{getUserName(ticket.requesterId)}</div>
                    <div className="text-sm text-gray-500">{getCompanyName(ticket.companyId)}</div>
                </td>
                 <td className="p-4">
                   <span className={`px-2 py-1 text-xs font-bold rounded-full ${getTypeColor(ticket.type)}`}>
                    {ticket.type}
                  </span>
                </td>
                <td className="p-4">
                    <select
                        value={ticket.assigneeId || ''}
                        onChange={(e) => onAssignTicket(ticket.id, e.target.value)}
                        className="w-full p-1.5 text-xs font-semibold rounded-lg border-gray-300 appearance-none bg-gray-50"
                    >
                        <option value="">Non assigné</option>
                        {assignableUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </td>
                <td className="p-4">
                  <select 
                    value={ticket.status} 
                    onChange={(e) => onUpdateTicketStatus(ticket.id, e.target.value as TicketStatus)}
                    className={`w-full p-1.5 text-xs font-bold rounded-full border-none appearance-none text-center ${getStatusColor(ticket.status)}`}
                  >
                    {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => onNavigate(View.AdminTicketDetail, ticket.id)} className="text-incubtek-orange hover:underline font-semibold text-sm">
                    Ouvrir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTickets.length === 0 && <p className="p-6 text-center text-gray-500">Aucun ticket correspondant aux filtres.</p>}
      </div>
    </div>
  );
};

export default AdminHelpdeskPage;