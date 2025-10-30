import React, { useState } from 'react';
import { Lead, LeadStatus, User } from '../types';
import { XMarkIcon } from './icons/Icons';

interface AdminLeadsPageProps {
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => void;
  onAddLeadNote: (leadId: string, note: string, author: string) => void;
  adminUser: User;
  onBack: () => void;
}

const getStatusColor = (status: LeadStatus) => {
    switch(status) {
        case 'Nouveau': return 'bg-blue-100 text-blue-800';
        case 'Contacté': return 'bg-yellow-100 text-yellow-800';
        case 'Converti': return 'bg-green-100 text-green-800';
        case 'Perdu': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const LEAD_STATUSES: LeadStatus[] = ['Nouveau', 'Contacté', 'Converti', 'Perdu'];

const LeadDetailModal: React.FC<{ lead: Lead; onClose: () => void; onAddNote: (leadId: string, note: string, author: string) => void; adminUser: User }> = ({ lead, onClose, onAddNote, adminUser }) => {
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (newNote.trim()) {
            onAddNote(lead.id, newNote, adminUser.name);
            setNewNote('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">{lead.name} - <span className="font-normal">{lead.company}</span></h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <XMarkIcon className="h-6 w-6 text-gray-600"/>
                    </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <h3 className="font-semibold text-gray-600 mb-2">Informations de contact</h3>
                        <p><strong>Email:</strong> <a href={`mailto:${lead.email}`} className="text-blue-600">{lead.email}</a></p>
                        <p><strong>Téléphone:</strong> {lead.phone || 'Non fourni'}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-600 mb-2">Besoin</h3>
                        <p className="bg-gray-50 p-3 rounded-md">{lead.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {lead.needs.map(need => <span key={need} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{need}</span>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-600 mb-2">Activité</h3>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {lead.activity?.map((act, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-lg text-sm">
                                    <p className="font-semibold">{act.author}</p>
                                    <p className="text-gray-700">{act.note}</p>
                                    <p className="text-xs text-gray-500 text-right">{new Date(act.timestamp).toLocaleString('fr-FR')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <h3 className="font-semibold text-gray-600 mb-2">Ajouter une note</h3>
                    <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={3} className="w-full p-2 border rounded-md" placeholder="Noter une interaction..."></textarea>
                    <button onClick={handleAddNote} className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700">
                        Ajouter la note
                    </button>
                </div>
            </div>
        </div>
    );
};


const AdminLeadsPage: React.FC<AdminLeadsPageProps> = ({ leads, onUpdateLeadStatus, onAddLeadNote, adminUser, onBack }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const sortedLeads = [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Gestion des Leads</h1>
            <p className="text-lg text-gray-600">Suivi des nouvelles opportunités commerciales.</p>
        </div>
         <button onClick={onBack} className="text-blue-600 font-semibold hover:underline">
          <i className="fas fa-arrow-left mr-2"></i>
          Retour au tableau de bord
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Besoins</th>
                    <th className="p-4 font-semibold">Date de Création</th>
                    <th className="p-4 font-semibold">Statut</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedLeads.map(lead => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                            <p className="font-medium text-gray-800">{lead.name}</p>
                            <p className="text-sm text-gray-500">{lead.company}</p>
                        </td>
                        <td className="p-4 text-gray-600 text-sm">
                           {lead.needs.join(', ')}
                        </td>
                        <td className="p-4 text-gray-600">{new Date(lead.createdAt).toLocaleDateString('fr-FR')}</td>
                        <td className="p-4">
                           <select 
                                value={lead.status} 
                                onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                className={`w-full p-1.5 text-xs font-bold rounded-full border-none appearance-none text-center ${getStatusColor(lead.status)}`}
                            >
                                {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </td>
                        <td className="p-4 text-center">
                            <button onClick={() => setSelectedLead(lead)} className="text-blue-600 hover:underline font-semibold text-sm">Détails</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
         {sortedLeads.length === 0 && <p className="p-6 text-center text-gray-500">Aucun lead pour le moment.</p>}
      </div>
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onAddNote={onAddLeadNote} adminUser={adminUser} />}
    </div>
  );
};

export default AdminLeadsPage;