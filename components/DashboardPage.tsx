import React from 'react';
import { View, User, Contract, Ticket, Document, TicketStatus } from '../types';
import { PlusCircleIcon, DocumentTextIcon, CogIcon, ServerIcon, WifiIcon, RocketIcon, CloudIcon, ShieldCheckIcon } from './icons/Icons';

interface DashboardPageProps {
  user: User;
  contracts: Contract[];
  tickets: Ticket[];
  documents: Document[];
  onNavigate: (view: View, data?: string) => void;
}

const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg ${className}`}>
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
    {children}
  </div>
);

const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes('support')) return <CogIcon />;
    if (name.includes('serveur')) return <ServerIcon />;
    if (name.includes('réseau') || name.includes('connectivité')) return <WifiIcon />;
    if (name.includes('domaine')) return <RocketIcon />;
    if (name.includes('microsoft') || name.includes('m35')) return <CloudIcon />;
    if (name.includes('sécurité')) return <ShieldCheckIcon />;
    return <CogIcon />;
}

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

const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
const formatDateTime = (isoString: string) => new Date(isoString).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });


const DashboardPage: React.FC<DashboardPageProps> = ({ user, contracts, tickets, documents, onNavigate }) => {
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Bienvenue, {user.name.split(' ')[0]}</h1>
        <p className="text-lg text-gray-600">Votre tableau de bord centralisé pour gérer vos services IT.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardCard title="Mes Services Actifs">
            <ul className="space-y-4">
              {contracts.map(contract => (
                <li key={contract.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-incubtek-orange p-3 rounded-full mr-4">{getServiceIcon(contract.serviceName)}</div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{contract.serviceName}</p>
                    <p className="text-sm text-gray-600">{contract.details}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500 ml-4">
                    <p>Expire le</p>
                    <p>{formatDate(contract.expires)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </DashboardCard>
          <DashboardCard title="Mes Demandes en Cours">
            {sortedTickets.length > 0 ? (
                <ul className="space-y-3">
                    {sortedTickets.map(ticket => (
                        <li key={ticket.id} onClick={() => onNavigate(View.ClientTicketDetail, ticket.id)} className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200">
                            <div>
                                <p className="font-semibold text-gray-800">{ticket.title}</p>
                                <p className="text-sm text-gray-500">Dernière mise à jour : {formatDateTime(ticket.updatedAt)}</p>
                            </div>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                                <i className="fas fa-chevron-right text-gray-400 ml-4"></i>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Vous n'avez aucune demande en cours.</p>
            )}
          </DashboardCard>
        </div>

        {/* Sidebar column */}
        <div className="space-y-8">
          <DashboardCard title="Support">
            <div className="space-y-3">
              <button onClick={() => onNavigate(View.NewTicket)} className="w-full flex items-center justify-center bg-incubtek-orange text-white font-semibold px-4 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
                <i className="fas fa-exclamation-triangle mr-2"></i> Signaler un Incident
              </button>
              <button onClick={() => onNavigate(View.NewTicket)} className="w-full flex items-center justify-center bg-incubtek-green text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-700 transition duration-300">
                <PlusCircleIcon /> <span className="ml-2">Faire une Demande</span>
              </button>
            </div>
          </DashboardCard>
          <DashboardCard title="Rapports & Factures">
             <ul className="space-y-3">
                {documents.map(doc => (
                    <li key={doc.id}>
                        <a href={doc.url} className="flex items-center p-3 text-incubtek-orange hover:bg-orange-50 rounded-lg transition duration-200">
                           <DocumentTextIcon className="text-incubtek-orange"/>
                           <span className="ml-3 font-medium">{doc.fileName}</span>
                        </a>
                    </li>
                ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;