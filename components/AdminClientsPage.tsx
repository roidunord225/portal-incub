import React, { useState } from 'react';
import { Company, User, Contract } from '../types';
import { XMarkIcon, PlusCircleIcon } from './icons/Icons';

interface AdminClientsPageProps {
  companies: Company[];
  users: User[];
  contracts: Contract[];
  onAddCompany: (companyName: string) => void;
  onAddUser: (companyId: string, userName: string, userEmail: string, userPassword: string) => void;
  onBack: () => void;
}

const AddCompanyModal: React.FC<{ onClose: () => void; onAddCompany: (name: string) => void }> = ({ onClose, onAddCompany }) => {
    const [name, setName] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddCompany(name.trim());
            onClose();
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Ajouter une Société</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <XMarkIcon className="h-6 w-6 text-gray-600"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nom de la société</label>
                        <input type="text" id="companyName" value={name} onChange={e => setName(e.target.value)} className="p-3 border rounded-lg w-full" required />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Annuler</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AddUserModal: React.FC<{ company: Company; onClose: () => void; onAddUser: (companyId: string, name: string, email: string, password: string) => void }> = ({ company, onClose, onAddUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim() && password.trim()) {
            onAddUser(company.id, name.trim(), email.trim(), password.trim());
            onClose();
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Ajouter un Utilisateur à {company.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                         <XMarkIcon className="h-6 w-6 text-gray-600"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                        <input type="text" id="userName" value={name} onChange={e => setName(e.target.value)} className="p-3 border rounded-lg w-full" required />
                    </div>
                    <div>
                        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="userEmail" value={email} onChange={e => setEmail(e.target.value)} className="p-3 border rounded-lg w-full" required />
                    </div>
                    <div>
                        <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input type="password" id="userPassword" value={password} onChange={e => setPassword(e.target.value)} className="p-3 border rounded-lg w-full" placeholder="Définir un mot de passe" required />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Annuler</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminClientsPage: React.FC<AdminClientsPageProps> = ({ companies, users, contracts, onAddCompany, onAddUser, onBack }) => {
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(companies.length > 0 ? companies[0].id : null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [userModalTargetCompany, setUserModalTargetCompany] = useState<Company | null>(null);

  const toggleCompany = (companyId: string) => {
    setExpandedCompanyId(expandedCompanyId === companyId ? null : companyId);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Gestion des Clients</h1>
          <p className="text-lg text-gray-600">Liste des sociétés clientes et de leurs informations.</p>
        </div>
        <div className="flex gap-4 items-center">
            <button onClick={() => setIsCompanyModalOpen(true)} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
                <PlusCircleIcon className="h-5 w-5 mr-2" /> Ajouter une Société
            </button>
            <button onClick={onBack} className="text-blue-600 font-semibold hover:underline">
            <i className="fas fa-arrow-left mr-2"></i>
            Retour
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="space-y-2 p-4">
          {companies.map(company => {
            const companyUsers = users.filter(u => u.companyId === company.id && u.role === 'client');
            const companyContracts = contracts.filter(c => c.companyId === company.id);
            const isExpanded = expandedCompanyId === company.id;

            return (
              <div key={company.id} className="border rounded-lg overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleCompany(company.id)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                >
                  <h2 className="text-xl font-bold text-gray-800">{company.name}</h2>
                  <i className={`fas fa-chevron-down transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
                </button>
                {isExpanded && (
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                        <div className="flex justify-between items-center mb-2 border-b pb-2">
                            <h3 className="font-semibold text-gray-700">Utilisateurs</h3>
                            <button onClick={() => setUserModalTargetCompany(company)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center">
                                <PlusCircleIcon className="h-4 w-4 mr-1 text-blue-600" /> Ajouter
                            </button>
                        </div>
                        <ul className="space-y-2 text-sm">
                            {companyUsers.map(user => (
                            <li key={user.id}>{user.name} <span className="text-gray-500">({user.email})</span></li>
                            ))}
                            {companyUsers.length === 0 && <li className="text-gray-400">Aucun utilisateur</li>}
                        </ul>
                        </div>
                        <div>
                        <h3 className="font-semibold text-gray-700 mb-2 border-b pb-2">Contrats Actifs</h3>
                        <ul className="space-y-2 text-sm">
                            {companyContracts.map(contract => (
                            <li key={contract.id}>
                                {contract.serviceName} - <span className="text-gray-500">Expire le {new Date(contract.expires).toLocaleDateString('fr-FR')}</span>
                            </li>
                            ))}
                            {companyContracts.length === 0 && <li className="text-gray-400">Aucun contrat</li>}
                        </ul>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isCompanyModalOpen && <AddCompanyModal onClose={() => setIsCompanyModalOpen(false)} onAddCompany={onAddCompany} />}
      {userModalTargetCompany && <AddUserModal company={userModalTargetCompany} onClose={() => setUserModalTargetCompany(null)} onAddUser={onAddUser} />}
    </div>
  );
};

export default AdminClientsPage;